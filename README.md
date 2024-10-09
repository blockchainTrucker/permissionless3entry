# Rewarding Mindset

## Table of Contents

-   [One-Sentence Description](#one-sentence-description)
-   [Purpose](#purpose)
-   [Use Case](#use-case)
-   [Supporting Data and Statistics](#supporting-data-and-statistics)
-   [Getting Started](#getting-started)
-   [Testing Instructions](#testing-instructions)
-   [Rootstock Intergration](#rootstock-intergration)
-   [XRPL Intergration](#xrpl-intergration)
-   [How We Fit into the Web3 Space](#how-we-fit-into-the-web3-space)
-   [About the Team](#about-the-team)

## One-Sentence Description

Rewarding Mindset is a wellness app that helps users build better mental health habits through personalized activities and rewards for progress, empowering them to improve their well-being in a motivating and accessible way.

## Purpose

Rewarding Mindset is a wellness platform that leverages gamification and blockchain rewards to make mental health and wellness an engaging, goal-oriented experience. By turning self-care into a rewarding journey, we motivate users to build positive habits while earning real value. Whether it’s stress management, mindfulness, or self-improvement, our platform transforms wellness activities into challenges where users earn rewards for practicing healthy habits.  
This innovative blend of wellness and reward systems ensures that users feel a sense of progress and achievement with every step they take toward better mental health. Rewarding Mindset is designed to make emotional and mental well-being not just accessible, but genuinely exciting and worthwhile.

## Use Case

In today’s fast-paced digital world, mental wellness often takes a backseat. Traditional therapy is inaccessible for many due to time constraints, cost, or the stigma associated with seeking professional help. Rewarding Mindset aims to fill this gap by making wellness tools accessible and engaging through a self-guided app that rewards positive actions. This app is vital because:

-   Growing Mental Health Crisis: 1 in 5 U.S. adults experience mental illness each year, but many do not seek help due to financial or societal barriers.
-   User Engagement via Gamification: Gamification has proven to increase user engagement by up to 48%, with rewards being a major motivating factor in behavior change.
-   Accessibility through Web3 Rewards: By leveraging decentralized technology, users earn real value for their efforts, reinforcing the benefits of building good mental habits.

## Supporting Data and Statistics

-   Market Demand: The global mental wellness market is expected to reach $131 billion by 2030, highlighting a growing demand for accessible mental health tools.
-   Digital Therapy Growth: The market for digital therapeutics is expected to grow at a CAGR of 24.2% through 2026, with an increasing number of people seeking self-guided mental health solutions.
-   Effectiveness of Rewards: According to studies, rewards and gamification can increase long-term user retention by up to 20%, helping individuals sustain their wellness habits.

## Getting Started

To access the Rewarding Mindset platform, follow these simple steps:

1. Visit the Website:  
   Go to https://rewarding-mindset-c2f9184a831f.herokuapp.com/](https://rewarding-mindset-c2f9184a831f.herokuapp.com/) to access the app.

2. Create an Account:

    - Click on the "Sign Up" button.
    - Provide your information and create a secure password.

3. Set Your Wellness Goals:

    - After signing up, you’ll be prompted to set your personal wellness goals based on your emotional state. (Coming soon)
    - This will help tailor the daily activities to your needs.

4. Start Your Wellness Journey:

    - Engage with tasks like journaling, mindfulness exercises, and therapy sessions.
    - Track your progress and earn rewards for completing activities.

5. Web3 Wallet Integration (Optional):
    - If you want to earn blockchain rewards, connect a Web3 wallet to your account to track and redeem tokens.

Shontea Wachtel, [10/9/2024 12:25 AM]

## Rootstock Integration

Rootstock was used to deploy an ERC-20 token called MIND. In the app, it is referred to as rMIND. The token is delivered to users after completing mindful tasks. At the beginning of user interaction, the app ensures that RSK is added to the user's wallet to ensure ease of use. The token balance is also displayed in the navbar. All token rewards are delivered straight to the user's wallet. Ethers.js was used for all contract interactions.

## XRPL Integration

XRPL was used to deploy an ERC-20 token called MIND. In the app, it is referred to as xMIND. The token is delivered to users after completing mindful tasks. At the beginning of user interaction, the app ensures that XRPL EVM Sidechain is added to the user's wallet to ensure ease of use. The token balance is also displayed in the navbar. All token rewards are delivered straight to the user's wallet. Ethers.js was used for all contract interactions.

## Testing Instructions

To test the integration of Rewarding Mindset:

1. Sign Up: Sign up is simple. All users need to do is enter their name, sign a message using the wallet of their choice, and choose the preferred network to receive their rewards on.
2. Web3 Integration: An ERC-20 smart contract was deployed on the Rootstock and XRPL EVM Sidechain. This smart contract is used to reward users with either the xMIND or rMIND tokens for completing mindful activities.
3. Engage with Wellness Activities: Use the journaling tools, guided meditations, EMDR therapy tool, and AI therapy sessions.
4. Earn Rewards: Complete activities to earn tokens.

For thorough testing, the following areas should be verified:

-   Journaling: Once a user has entered 20 characters, the entry can be submitted for rewards.
-   Meditation: Users are rewarded at the completion of the meditation video.
-   EMDR Therapy: Users are rewarded at the completion of the EMDR video.
-   Virtual Therapist: User can click end session when the messages length is 4 or greater to receive reward.

## How We Fit into the Web3 Space

Rewarding Mindset integrates with the Web3 ecosystem by utilizing blockchain technology to provide a decentralized reward system. Users earn tokens for completing wellness activities such as journaling, mindfulness exercises, and therapy sessions. These ERC-20 tokens are deposited directly into the user’s non-custodial wallet offering users transparency, autonomy, and real value that can be exchanged for premium features or wellness resources. Our decentralized approach allows users to have full control over their wellness journey while being rewarded for progress, making mental health care more engaging and accessible.

## About the Team

### Jesse Wachtel

Jesse Wachtel is the lead Web3 developer and coder behind this project. As the founder of Decentralized Ventures, Jesse has created and launched innovative platforms like Funding Chain, a decentralized crowdfunding platform, and Smart Contract Verifier, a tool for securely verifying smart contracts. In addition to his entrepreneurial work, Jesse serves as the Lead Engineer at Thrilld Labs, where he not only drives web development but also mentors a team of interns entering the Web3 space. His expertise and leadership make him a key advisor to the company's Founder and CEO.

### Shontea Wachtel

Shontea Wachtel, currently pursuing her degree in psychology, is driven by a strong desire to help individuals access mental wellness tools and resources. With a background as a stay-at-home mom, she understands the importance of creating practical, accessible solutions for those facing emotional challenges. Having witnessed firsthand how people often struggle to find the guidance they need, Shontea’s mission is to build platforms that encourage self-improvement through habit-forming activities and rewards. Her approach focuses on helping users establish meaningful wellness practices and promoting lasting positive change.
