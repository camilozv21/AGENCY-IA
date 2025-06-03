"use client";

import React from 'react';
import { Container, Title, Text, Divider, List } from '@mantine/core';

export default function PrivacyPolicy() {
  return (
    <Container size="md" py="md">
      <Title order={1}>🛡️ Privacy Policy</Title>
      <Text mt="md">Last updated: June 3, 2025</Text>
      <Divider my="md" />

      <Text>
        At ContiA, operated by J&M Industry, LLC, we are committed to protecting your personal information and your right to privacy.
        This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or use our services.
      </Text>

      <Title order={2} mt="md">1. Information We Collect</Title>
      <List spacing="sm" type="unordered">
        <List.Item>
          <Text><strong>a. Information You Provide to Us:</strong></Text>
          <List type="unordered" spacing="xs" withPadding>
            <List.Item>Name, email address, and business details when registering or subscribing.</List.Item>
            <List.Item>Payment details (processed securely via Stripe).</List.Item>
            <List.Item>Prompts or content entered when using our AI generation services.</List.Item>
          </List>
        </List.Item>
        <List.Item>
          <Text><strong>b. Information Collected Automatically:</strong></Text>
          <List type="unordered" spacing="xs" withPadding>
            <List.Item>IP address, browser type, device information.</List.Item>
            <List.Item>Usage data such as pages visited and time spent on the platform.</List.Item>
          </List>
        </List.Item>
        <List.Item>
          <Text><strong>c. Third-Party Authentication:</strong></Text>
          <List type="unordered" spacing="xs" withPadding>
            <List.Item>
              When signing in via Google OAuth, we receive your name, email, and profile picture (if available), strictly for authentication and account setup purposes.
            </List.Item>
          </List>
        </List.Item>
      </List>

      <Title order={2} mt="md">2. Use of Your Information</Title>
      <List spacing="sm" type="unordered">
        <List.Item>Provide and maintain our AI content generation services.</List.Item>
        <List.Item>Process payments securely via Stripe.</List.Item>
        <List.Item>Improve user experience and personalize content.</List.Item>
        <List.Item>Communicate with you (support, updates, offers).</List.Item>
        <List.Item>Prevent fraud, abuse, and ensure account security.</List.Item>
      </List>

      <Title order={2} mt="md">3. Sharing Your Information</Title>
      <List spacing="sm" type="unordered">
        <List.Item>
          <strong>Stripe</strong> – for payment processing (we do not store credit card numbers).
        </List.Item>
        <List.Item>
          <strong>Google</strong> – for OAuth-based authentication.
        </List.Item>
        <List.Item>
          <strong>Service providers</strong> – for infrastructure, analytics, or customer support under strict data confidentiality agreements.
        </List.Item>
        <List.Item>
          <strong>Legal reasons</strong> – if required to comply with the law or enforce our Terms of Service.
        </List.Item>
      </List>

      <Title order={2} mt="md">4. Data Security</Title>
      <Text mt="sm">
        We follow industry best practices and security protocols to protect your information.
        All sensitive data is encrypted in transit and at rest using secure technologies.
      </Text>

      <Title order={2} mt="md">5. Your Rights and Choices</Title>
      <List spacing="sm" type="unordered">
        <List.Item>Access or correct your personal information.</List.Item>
        <List.Item>Delete your account and associated data.</List.Item>
        <List.Item>Opt-out of non-essential communications.</List.Item>
        <List.Item>To exercise these rights, contact us at: contia@contia.io</List.Item>
      </List>

      <Title order={2} mt="md">6. Cookies and Tracking</Title>
      <List spacing="sm" type="unordered">
        <List.Item>Keep you logged in.</List.Item>
        <List.Item>Analyze usage behavior.</List.Item>
        <List.Item>Improve our services.</List.Item>
        <List.Item>You can control cookie preferences in your browser settings.</List.Item>
      </List>

      <Title order={2} mt="md">7. International Data Transfers</Title>
      <Text mt="sm">
        If you are accessing the site outside the United States, please be aware that your data may be transferred to, stored, and processed in the U.S., where our servers are located and operated.
      </Text>

      <Title order={2} mt="md">8. Changes to This Policy</Title>
      <Text mt="sm">
        We may update this Privacy Policy from time to time. We will notify you of significant changes by email or on the site.
      </Text>

      <Title order={2} mt="md">9. Contact Us</Title>
      <Text mt="sm">
        If you have any questions about this Privacy Policy or how we handle your data, please contact:
        <br />J&M Industry, LLC
        <br />📧 Email: contia@contia.io
        <br />🌐 Website: https://www.contia.io
      </Text>
    </Container>
  );
}
