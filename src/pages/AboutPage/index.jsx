import React from 'react';
import { Container } from '@material-ui/core';

export default function AboutPage() {
  return (
    <Container style={{ minHeight: '90vh' }}>
      <h1>Motivation</h1>
      <p>
        Me and my girlfriend - Trang both love food, esp. street food. So I made
        this app for me and her to store places that we want to visit in the
        future and pick a random place when we can not make our dicision.
      </p>
      <h1>Owner</h1>
      <p>
        My name is Khoa and I am the creator of this app. You can visit me via :
        {' '}
        <a href="https://khoatrn.netlify.app">this link</a>
      </p>
      <h1>Attribution</h1>
      <p>Thank you so much for free resources!</p>
      <ul>
        <li>
          <a href="https://www.vecteezy.com/free-vector/people">
            People Vectors by Vecteezy
          </a>
        </li>
        <li>
          <a href="https://www.freepik.com/vectors/business">
            Business vector created by pikisuperstar - www.freepik.com
          </a>
        </li>
        <li>
          <a href="https://storyset.com/technology">
            Technology illustrations by Storyset
          </a>
        </li>
        <li>
          <a href="https://storyset.com/online">
            Online illustrations by Storyset
          </a>
        </li>
        <li>
          <div>
            Icons made by
            {' '}
            <a href="https://www.freepik.com" title="Freepik">
              Freepik
            </a>
            {' '}
            from
            {' '}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </div>
        </li>
        <li>
          <a href="https://storyset.com/web">Web illustrations by Storyset</a>
        </li>
        <li>
          <a href="https://storyset.com/communication">Communication illustrations by Storyset</a>
        </li>
        <li>
          <a href="https://storyset.com/home">Home illustrations by Storyset</a>
        </li>
        <li>
          <a href="https://storyset.com/data">Data illustrations by Storyset</a>
        </li>
      </ul>
    </Container>
  );
}
