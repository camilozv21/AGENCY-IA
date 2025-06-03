"use client";

import React from 'react';
import { Container, Title, Text, Divider, List } from '@mantine/core';

export default function TermsOfService() {
  return (
    <Container size="md" py="md">
      <Title order={1}>📜 Terms of Service</Title>
      <Text mt="md">Last updated: June 3, 2025</Text>
      <Divider my="md" />

      <Text>
        Welcome to ContiA, operated by J&M Industry, LLC. By accessing or using our website and services, you agree to be bound by the following Terms of Service. If you do not agree, please do not use our services.
      </Text>

      <Title order={2} mt="md">1. Use of the Service</Title>
      <Text mt="sm">
        ContiA offers AI-powered content generation tools (text, images, video) to help businesses improve their online presence. You agree to use the service only for lawful purposes and in accordance with these terms.
      </Text>
      <Text mt="sm">You agree not to:</Text>
      <List spacing="xs" type="unordered" withPadding mt="xs">
        <List.Item>Use the service for unlawful, misleading, defamatory, or harmful content.</List.Item>
        <List.Item>Attempt to reverse-engineer, copy, or modify our software.</List.Item>
        <List.Item>Resell, sublicense, or commercially exploit the service without permission.</List.Item>
        <List.Item>Upload content that violates intellectual property rights or contains prohibited material.</List.Item>
      </List>

      <Title order={2} mt="md">2. Account Registration and Access</Title>
      <List spacing="xs" type="unordered" withPadding mt="sm">
        <List.Item>You must be at least 18 years old to use our service.</List.Item>
        <List.Item>You may register using Google OAuth or email/password.</List.Item>
        <List.Item>You are responsible for maintaining the confidentiality of your account and password.</List.Item>
        <List.Item>You agree to provide accurate and complete information.</List.Item>
      </List>

      <Title order={2} mt="md">3. Payments and Billing</Title>
      <List spacing="xs" type="unordered" withPadding mt="sm">
        <List.Item>All payments are securely processed via Stripe.</List.Item>
        <List.Item>Subscriptions are billed monthly or yearly unless canceled.</List.Item>
        <List.Item>You agree to pay all applicable fees and taxes associated with your plan.</List.Item>
        <List.Item>
          You may cancel your subscription at any time via your dashboard; however, no refunds are issued for partial billing periods.
        </List.Item>
      </List>

      <Title order={2} mt="md">4. Content Ownership and Usage</Title>
      <Text mt="sm">
        Generated content (text, images, video) is owned by you, the user, provided it complies with our acceptable use policy.
        <br /><br />
        We reserve the right to remove or disable access to any content that violates these terms or applicable laws.
      </Text>

      <Title order={2} mt="md">5. Acceptable Use of AI Services</Title>
      <Text mt="sm">
        By using ContiA’s AI tools (including models from OpenAI and others), you agree not to use them for:
      </Text>
      <List spacing="xs" type="unordered" withPadding mt="xs">
        <List.Item>Generating or promoting violence, hate speech, sexual content, or misinformation.</List.Item>
        <List.Item>Producing deceptive or illegal marketing campaigns.</List.Item>
        <List.Item>Violating platform policies (e.g., OpenAI, AWS, Google, Meta).</List.Item>
      </List>
      <Text mt="sm">
        We actively filter harmful content via automated systems and may suspend accounts that violate this policy.
      </Text>

      <Title order={2} mt="md">6. Service Availability</Title>
      <Text mt="sm">
        We strive to maintain continuous access to our services, but we do not guarantee uninterrupted uptime. ContiA may suspend or limit service availability due to maintenance or unforeseen issues.
      </Text>

      <Title order={2} mt="md">7. Termination</Title>
      <Text mt="sm">
        We reserve the right to terminate or suspend your account if you violate these terms. You may also cancel your account at any time. Termination may result in deletion of your account data.
      </Text>

      <Title order={2} mt="md">8. Limitation of Liability</Title>
      <Text mt="sm">
        To the fullest extent permitted by law, J&M Industry, LLC shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service. Our total liability shall not exceed the fees paid in the last 3 months.
      </Text>

      <Title order={2} mt="md">9. Modifications to These Terms</Title>
      <Text mt="sm">
        We may revise these terms at any time. You will be notified of material changes. Continued use of the service after updates constitutes your acceptance.
      </Text>

      <Title order={2} mt="md">10. Governing Law</Title>
      <Text mt="sm">
        These terms are governed by the laws of the State of Delaware, United States, without regard to conflict of law principles.
      </Text>

      <Title order={2} mt="md">11. Contact</Title>
      <Text mt="sm">
        For questions about these Terms of Service, contact us at:
        <br />📧 Email: contia@contia.io
        <br />🌐 Website: https://www.contia.io
      </Text>
    </Container>
  );
}