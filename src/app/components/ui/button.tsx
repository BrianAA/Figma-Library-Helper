import {styled, theme} from '../../../../stiches.theme';

export const Button = styled('button', {
    boxSizing: 'content-box',
    backgroundColor: theme.colors.blue,
    color: theme.colors.light,
    border: 'none',
    padding: '0px 10px',
    borderRadius: 6,
    height: 30,
    whiteSpace: 'nowrap',
    fontFamily: 'Inter',
    fontSize: theme.fontSizes.button,
    letterSpacing: theme.letterSpacings.relaxed,
    lineHeight: theme.lineHeights.basic,
    textAlign: 'center',
    transition: 'opacity .25s',
    '&:hover': {
        opacity: 0.6,
        padding: '0px 10px',
    },
});
