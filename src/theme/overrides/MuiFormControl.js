import palette from '../palette';

export default {
    root: {
        '&$selected': {
            backgroundColor: palette.background.default
        },
        '&$hover': {
            '&:hover': {
                backgroundColor: palette.background.default
            }
        },
        '&$focus': {
            '&:focus': {
                backgroundColor: palette.background.default
            }
        }
    }
};
