import React from "react";
import{Box, Columns, Block, Heading, Content} from "react-bulma-components";
export default class ListNotificationItem extends React.Component
{
  render = () =>{
    return (
        <Box>
          <Heading size={4}> Pedido n° xx </Heading>    
            <Columns>
              <Columns.Column>
                <Content> 
                  <Block style={{ margin: "0px" }}>
                    <strong>Data:</strong> 24/05/2021
                  </Block>
                  <Block style={{ margin: "0px" }}>
                    <strong>Status:</strong>Em preparado
                  </Block>
                  <Block style={{ margin: "0px" }}>
                    <strong>Tempo estimado:</strong> 10min
                  </Block>
                  <Block style={{ margin: "0px" }}>
                    <strong>Forma de pagamento:</strong> Visa
                  </Block> 
                </Content>             
              </Columns.Column>
              <Columns.Column>
                <Content style={{marginTop:"0px"}}> 
                    <ul>
                      <li>1 Pastel de carne</li>
                      <li>1 Pastel de queijo</li>
                      <li>1 Pastel de calabresa</li>
                      <li>1 Pastel de carne e panela</li>
                    </ul> 
                </Content>
              </Columns.Column>
            </Columns>
        </Box>
    );
  }
}
