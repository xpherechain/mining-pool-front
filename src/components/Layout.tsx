import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #eaeaea;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #333;
  &:hover {
    color: #0070f3;
  }
`;

const Footer = styled.footer`
  padding: 2rem 0;
  border-top: 1px solid #eaeaea;
  text-align: center;
  margin-top: 2rem;
`;

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout = ({ children, title = 'Mining Pool' }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>pool.x-phere.com</title>
        <meta name="description" content="Stratum Mining Pool" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Header>
          <Logo>
            <Link href="/" legacyBehavior passHref>
              <NavLink>X-Phere Mining Pool</NavLink>
            </Link>
          </Logo>
          <Nav>
            <Link href="/" legacyBehavior passHref>
              <NavLink>Home</NavLink>
            </Link>
            <Link href="/getting-started" legacyBehavior passHref>
              <NavLink>Getting Start</NavLink>
            </Link>
            <Link href="/downloads" legacyBehavior passHref>
              <NavLink>Download</NavLink>
            </Link>
            <Link href="/search" legacyBehavior passHref>
              <NavLink>Search</NavLink>
            </Link>
            <Link href="/stats" legacyBehavior passHref>
              <NavLink>Stats</NavLink>
            </Link>
          </Nav>
        </Header>
        <main>{children}</main>
        <Footer>
          <p>© {new Date().getFullYear()} X-Phere Mining Pool. All rights reserved.</p>
          <p>pool.x-phere.com</p>
        </Footer>
      </Container>
    </>
  );
};

export default Layout;
