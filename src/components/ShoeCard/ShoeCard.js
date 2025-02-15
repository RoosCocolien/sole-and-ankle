import React from 'react'
import styled from 'styled-components/macro'

import { COLORS, WEIGHTS } from '../../constants'
import { formatPrice, pluralize, isNewShoe } from '../../utils'
import Spacer from '../Spacer'

const translate = {
  'on-sale': 'Sale',
  'new-release': 'Just released!',
}

const ShoeCard = ({ slug, name, imageSrc, price, salePrice, releaseDate, numOfColors }) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const color = variant === 'on-sale' ? 'primary' : 'secondary'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt='' src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price textDecorationLine={variant === 'on-sale' ? 'line-through' : 'none'} variant={variant}>
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' ? <SalePrice>{formatPrice(price - 5000)}</SalePrice> : null}
        </Row>
      </Wrapper>
      {variant !== 'default' ? <Variant type={color}>{translate[variant]}</Variant> : null}
    </Link>
  )
}

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 0 300px;
  position: relative;
`
const Variant = styled.div`
  background-color: ${(props) => (props.type === 'primary' ? COLORS.primary : COLORS.secondary)};
  color: ${COLORS.white};
  font-weight: ${WEIGHTS.medium};
  display: inline;
  position: absolute;
  padding: 10px;
  top: 12px;
  right: -4px;
  border-radius: 2px;
`

const Wrapper = styled.article``

const ImageWrapper = styled.div`
  position: relative;
`

const Image = styled.img`
  width: 100%;
`

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`

const Price = styled.span`
  text-decoration-line: ${(props) => props.textDecorationLine};
  color: ${(props) => (props.variant === 'on-sale' ? COLORS.gray[700] : COLORS.gray[900])};
`

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`

export default ShoeCard
