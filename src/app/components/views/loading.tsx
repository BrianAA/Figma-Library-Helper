import * as React from 'react';
import {styled, theme} from '../../../../stiches.theme';
import {Heading} from '../ui/Heading';
//@ts-ignore
import Spinner from '../../assets/loader.gif';
import {BodyText} from '../ui/body';
export default function Loading({progress}) {
    const Container = styled('main', {
        padding: 16,
    });
    const FlexBox = styled('div', {
        display: 'flex',
        alignItems: 'center',
        '& img': {
            padding: '8px',
        },
    });

    return (
        <Container>
            <FlexBox>
                <img src={Spinner} height="16px" width="16px" />
                <Heading>Scanning</Heading>
                <BodyText css={{color: theme.colors.accessible}}>{progress}%</BodyText>
            </FlexBox>
            <BodyText>
                For large libraries this can take some time. Please note this action cannot cancel until completed.
            </BodyText>
        </Container>
    );
}
