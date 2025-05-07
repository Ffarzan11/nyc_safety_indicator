<h1 align="center">NYC Safety Indicator</h1>

## Introduction
This project evaluates the safety of different regions in New York City using official crime statistics. It generates a comprehensive crime breakdown and calculates a safety index for each area, helping users understand and compare the relative safety across the city.

## Team
| Name                | Role                        |
|---------------------|-----------------------------|
| Farhikhta Farzan    | Fullstack Developer         |
| Sabeha Khan         | Backend and Model Developer |
| Aaleia Fernando     | Frontend Developer          |
| Mohammed Bensassi   | Frontend Developer          |
| Johnny Wang         | Model Developer             |

## Deployed Version
Try the project here 🚨
https://nycsafetyindicator.vercel.app/

## UI

## Project Outline

The goal of this project is to enhance safety awareness for New Yorkers by providing a location-based safety score. Users can assess how safe a location is based on crime data, community input, and real-time alerts.

#### Key Features
- **Safety Score**: Location-specific safety index based on crime statistics.
- **Detailed Reports**: Crime breakdowns by type and frequency.
- **Anonymous Reviews**: Community-submitted safety experiences.
- **Emergency Alerts**: Notifications when entering low-safety areas.
- **Top Crime News**: Updates on the top 3 recent NYC crime stories.
- **Interactive Map**: Searchable NYC map with safety overlays.

## Dataset Used
#### [NYPD Arrest Data (Year-to-Date)](https://data.cityofnewyork.us/Public-Safety/NYPD-Arrest-Data-Year-to-Date-/uip8-fykc)

This dataset contains details of all arrests made by the NYPD in NYC during the current year. It is manually compiled and reviewed quarterly by the Office of Management Analysis and Planning. Each entry includes the type of crime, location, time of arrest, and suspect demographics. The dataset helps the public understand the scope and nature of police enforcement. Additional notes are available in the attached footnotes.


## Technology Used
1. Next.JS
2. Django
3. Figma
4. Numpy
5. Scikit-Learn
6. Panda
7. Supabase

## External APIs Used
1. Mapbox
2. Geo location
3. Newsdata.io
4. Google Auth

   
   
## PROJECT SET UP INSTRUCTIONS

### 1. Clone the  Repository
```bash
git clone <backend-repository-url>
cd NYC-Safety-Indicator
cd backend
```
### 2. Backend Set Up
```bash
# Create a virtual environment
python3 -m venv venv

# Activate the virtual environment (macOS/Linux)
source venv/bin/activate

# Activate the virtual environment (Windows)
venv\Scripts\activate

# Install required dependencies
pip install -r requirements.txt

# Apply database migrations
python3 manage.py migrate

# Run the backend server
python3 manage.py runserver
```
### 3. Frontend Set up
```bash
cd frontend/geosafe-hub

# Install required dependencies
npm install

# Run the frontend development server
npm run dev
```
