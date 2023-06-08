import React from 'react';
import { Box, Container, Link, Typography, styled } from '@mui/material';

const FooterWrapper = styled(Container)(
  ({ theme }) => `
        margin-top: ${theme.spacing(4)};
`
);

function Footer() {
  return (
    <FooterWrapper className="footer-wrapper">
      <Box
        pb={4}
        display={{ xs: 'block', md: 'flex' }}
        alignItems="center"
        textAlign={{ xs: 'center', md: 'left' }}
        justifyContent="space-between"
      >
        <Box></Box>

        {/* Created by{' '}
          <Link href="https://nitel.mw" target="_blank" rel="noopener noreferrer">
            nitel.mw
          </Link> */}
        <Typography variant="subtitle1">&copy; 2023 - NITEL ERP </Typography>
      </Box>
    </FooterWrapper>
  );
}

export default Footer;
