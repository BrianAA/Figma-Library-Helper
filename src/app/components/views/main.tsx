import * as React from 'react';
import {styled} from '../../../../stiches.theme';
//@ts-ignore
import Splash from '../../assets/main_splash_image.png';
import {Button} from '../ui/button';
import {BodyText} from '../ui/body';
export default function Main({onEval}) {
    const Container = styled('div', {
        padding: 16,
    });
    const FlexBox = styled('div', {
        width: '100%',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'flex-end',
    });
    return (
        <section>
            <img src={Splash} width="100%" height="auto" />
            <Container>
                <BodyText>
                    Generate a JSON reBodyTextort of your components, variants and properties. Review and apply bulk
                    updates to your components.
                </BodyText>
                <FlexBox>
                    <Button className="halfOnHover" onClick={onEval}>
                        Generate Report
                    </Button>
                </FlexBox>
            </Container>
        </section>
    );
}
