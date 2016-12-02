const StyleSheet = require("aphrodite").StyleSheet;

const button = StyleSheet.create({
    buttonStyle: {
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderLeft: '0',
        cursor: 'pointer',
        margin: '0',
        padding: '5px 10px',
        position: 'relative', // for hover

        ':first-child': {
            borderLeft: '1px solid #ccc',
            borderTopLeftRadius: '3px',
            borderBottomLeftRadius: '3px',
        },

        ':last-child': {
            borderRight: '1px solid #ccc',
            borderTopRightRadius: '3px',
            borderBottomRightRadius: '3px',
        },

        ':hover': {
            backgroundColor: '#ccc',
        },

        ':focus': {
            zIndex: '2',
        },
    },

    selectedStyle: {
        backgroundColor: '#ddd',
    },
});

module.exports = {
    button: button,
};
