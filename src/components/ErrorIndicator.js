import React from 'react';
import styled from 'styled-components';

const ErrorMessageWrapper = styled.h2`
    text-align: center;
`

const ErrorIndicator = () => <ErrorMessageWrapper>City not found</ErrorMessageWrapper>

export default ErrorIndicator;