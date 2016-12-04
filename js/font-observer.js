"use strict";
/**
 * A FontObserver notifies registered listeners when a font has loaded.
 *
 * The constructor accepts a filter function that allows you to choose what
 * fonts to listen for.
 *
 * If the browser doesn't support the CSS Font Loading module, then we instead
 * yield a DummyFontObserver class, which never yields font load events.
 * https://drafts.csswg.org/css-font-loading/
 *
 * DO NOT DEPEND ON THESE EVENTS. Browser support for this API is poor. But
 * it's still a helpful way to resolve minor race conditions :)
 */
class FontObserver {
    constructor(fontFilter) {
        this._fontFilter = fontFilter;
        this._initialized = false;
        this._listeners = [];
    }

    _initialize() {
        if (this._initialized) {
            return;
        }
        this._initialized = true;

        // TODO(mdr): Mystery timeout! If I don't include this, then we
        //     successfully get FontFace objects for each of the KaTeX
        //     fonts, but they're somehow bad references that never change
        //     their load status. Maybe we do something weird when managing
        //     KaTeX stylesheets, or maybe it's just a Chrome bug?
        setTimeout(() => {
            // The spec is vague about exactly *how* Set-like a FontFaceSet
            // should be, so it's tricky to get an iterable that behaves the
            // same way in Chrome 54 and Firefox 50. But the `values`
            // *iterator* behaves consistently, so we can wrap our own iterable
            // around it :)
            const allFonts = Array.from({
                [Symbol.iterator]: () => document.fonts.values(),
            });
            const targetedFonts = allFonts.filter(this._fontFilter);

            for (const font of targetedFonts) {
                font.loaded.then(() => this._notifyListeners(font));
            }
        }, 0);
    }

    _notifyListeners(font) {
        for (const listener of this._listeners) {
            listener(font);
        }
    }

    addListener(listener) {
        this._listeners = this._listeners.concat(listener);
        this._initialize();
    }

    removeListener(listener) {
        this._listeners = this._listeners.filter(l => l !== listener);
    }
}

class DummyFontObserver {
    addListener() {}
    removeListener() {}
}

module.exports = document.fonts ? FontObserver : DummyFontObserver;
