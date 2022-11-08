import {createStitches, globalCss} from '@stitches/react';

export const {styled, css, keyframes, getCssText, theme, createTheme, config} = createStitches({
    theme: {
        colors: {
            primary: '#111111',
            background: '#FFFFFF',
            light: '#FFFFFF',
            rules: '#AAAAAA',
            subtle: '#F0F0F0',
            accessible: '#666666',
            blue: '#18A0FB',
            error: '#E05534',
        },
        fontSizes: {
            bodyText: 11,
            button: 11,
            heading: 16,
        },
        letterSpacings: {
            relaxed: '.05rem',
        },
        lineHeights: {
            basic: '16px',
        },
        space: {
            50: '8px',
            100: '16px',
            200: '32px',
        },
        shadows: {
            popOver: '0px 4px 8px 0px rgba(102, 102, 102, 0.25)',
        },
    },
});

export const GlobalStyles = globalCss({
    body: {
        margin: 0,
        height: '100%',
        width: '100%',
        overflow: 'hidden',
    },
});
