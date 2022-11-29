import {theme, styled} from '../../../../stiches.theme';

export const BodyText = styled('p', {
    margin: 0,
    marginBottom: '8px',
    fontSize: 11,
    lineHeight: theme.lineHeights.basic,
    fontWeight: 400,
    color: 'inherit',
    fontFamily: 'Inter',
    letterSpacing: theme.letterSpacings.relaxed,
});
