
# CHRISTOFFEL'S MENU MANAGER - Restaurant App

## Student Information
**Name:** Christoffel
**Module:** Mobile scripting - POE
**App Name:** Christoffel's Menu Manager

## Project Description
Christoffel's Menu Manager is a mobile-friendly restaurant menu management application built with React Native and Expo. The app allows restaurant managers to manage their menu items efficiently with full CRUD functionality.

The app was designed for a fine-dining restaurant to digitize their menu 

## Features Implemented

### 1. READ - Display Menu Items
- Displays all menu items with name, description, price and category
- Clean card layout with blue background for readability
- Shows 3 default dishes: Grilled Steak, Caesar Salad, Chocolate Cake

### 2. CREATE - Add New Dish
- Form with Name, Description and Price fields
- Validates that Name and Price are required
- Automatically converts dish name to uppercase for consistency
- Updates total count and average price instantly



### 4. DELETE - Remove Dish
- Delete button on each dish card
- Immediately removes dish from list
- Recalculates totals automatically

### 5. SEARCH & FILTER
- Real-time search bar at top
- Case-insensitive filtering (e.g., "steak" finds "GRILLED STEAK")
- Filters as you type

### 6. AUTOMATIC CALCULATIONS
- **Total Menu Items:** Count of all dishes (e.g., 3 items)
- **Average Price:** Average price of all dishes calculated dynamically
- Updates automatically after Add/Edit/Delete

## Tech Stack
- **Framework:** React Native + Expo
- **Routing:** Expo Router (Stack navigation)
- **Language:** TypeScript (TSX)
- **Styling:** React Native StyleSheet
- **State Management:** React useState Hook

## How to Run the App

### Prerequisites
- Node.js installed
- VS Code

### Installation Steps
1. Clone or download the project
2. Open terminal in project folder
3. Run: `npm install`
4. Run: `npx expo start --clear`
5. Press `w` to open in web browser (localhost:8081 / 8082)
6. Or scan QR code with Expo Go app on phone

