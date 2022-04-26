import React from 'react';
import styled from 'styled-components';
import AddToCart from './AddToCart.jsx';
import ImageGallery from './ImageGallery.jsx';
import StyleSelector from './StyleSelector.jsx';
import StarRating from '../ReviewAndRating/StarRating.jsx'

const Flexcontainer = styled.div`
  display: flex;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column
`;
const SalePrice = styled.p`
  color: red;
  margin-right: 12px;
`;

const DiscountedPrice = styled.p`
  text-decoration: line-through
`;

const SmallLink = styled.p`
  text-decoration: underline
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 0px;
  margin-bottom: 12px;
  height: 32px;
`;

const OverviewContainer = styled.div`
  margin-bottom: 64px;
`;

const Stars = styled.div`
  margin-right: 12px;
`;

const H2 = styled.h2`
  margin-top: 0px;
  margin-bottom: 12px;
`;

const H5 = styled.h5`
  font-weight: 400;
  text-transform: uppercase;
  color: #707070;
  margin-top: 0px;
  margin-bottom: 8px;
`;

const Text = styled.div`
  padding: 0px 80px;
  margin-top: 32px;
`;

const Strong = styled.strong`
  margin-bottom: 4px;
`;

export default class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originalPrice: this.props.data.styleData[0]['original_price'],
      salePrice: this.props.data.styleData[0]['sale_price'],
      isPortrait: []
    }
    this.changeStylePrice = this.changeStylePrice.bind(this);
  }

  changeStylePrice(index){
    const originalPrice = this.props.data.styleData[index]['original_price'];
    const salePrice = this.props.data.styleData[index]['sale_price'];
    this.setState({
      originalPrice: originalPrice,
      salePrice: salePrice
    })
  }

  render() {
    const {category, default_price, description, features, id, name, slogan, styleData = []} = this.props.data;
    const { addOutfit, changeStyle, currentStyle, productId, removeOutfit } = this.props;

    //Add discounted price if available
    let price = this.state.salePrice === null ?
      (<FlexRow>
        <p>${this.state.originalPrice}</p>
      </FlexRow>) :
      (<FlexRow>
        <SalePrice>${this.state.salePrice}</SalePrice>
        <DiscountedPrice>${this.state.originalPrice}</DiscountedPrice>
       </FlexRow>
      );

    return (
      <OverviewContainer>
        <Flexcontainer>
          <ImageGallery
            currentStyle={currentStyle}
            photos={styleData[currentStyle]['photos']}
          />
          <FlexColumn>
            <FlexRow>
              <Stars>
                <StarRating ratings={this.props.ratings} showAve={false}/>
              </Stars>
              <SmallLink>Read all reviews</SmallLink>
            </FlexRow>
            <H5>{category}</H5>
            <H2>{name}</H2>
            {price}
            <StyleSelector
              changeStyle={changeStyle}
              changeStylePrice={this.changeStylePrice} currentStyle={currentStyle}
              styles={styleData}
            />
            <AddToCart addOutfit={addOutfit} productId={productId} removeOutfit={removeOutfit} skus={styleData[currentStyle]['skus']}/>
          </FlexColumn>
        </Flexcontainer>
        <Text>
          <Strong>{slogan}</Strong>
          <p>{description}</p>
        </Text>
      </OverviewContainer>
    );
  }
}


