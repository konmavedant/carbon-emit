# Carbon Emission Calculator

A comprehensive full-stack web application for calculating carbon emissions for both personal and industrial use. The application provides detailed insights, GHG Protocol compliance, and comprehensive emission analysis with interactive visualizations.

## Features

### 🌍 Dual Calculator System
- **Personal Calculator**: Calculate individual carbon footprint across multiple lifestyle categories
- **Industrial Calculator**: Enterprise-level emission calculations following GHG Protocol standards

### 📊 Comprehensive Analysis
- **Detailed Breakdowns**: Visual charts showing emissions by category
- **Performance Benchmarking**: Compare against global, country, and industry averages
- **Forecasting**: 12-month emission predictions with trend analysis
- **Optimization Recommendations**: Personalized suggestions for emission reduction

### 🎯 GHG Protocol Compliance
- **Scope 1 Emissions**: Direct emissions from owned/controlled sources
- **Scope 2 Emissions**: Indirect emissions from purchased energy
- **Scope 3 Emissions**: All other indirect emissions in the value chain

### 📈 Interactive Visualizations
- **Pie Charts**: Category-wise emission distribution with detailed labels
- **Bar Charts**: Comparative analysis across emission sources
- **Line Charts**: Forecast trends and projections
- **Performance Cards**: Key metrics and benchmarks

### 🌱 Sustainability Features
- **Action Priorities**: Ranked recommendations by impact potential
- **Progress Tracking**: Monitor emission reduction over time
- **External Integration**: Links to carbon management platforms (industrial only)

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and optimized builds
- **Tailwind CSS** with shadcn/ui components
- **TanStack Query** for server state management
- **Wouter** for client-side routing
- **Recharts** for data visualization
- **Framer Motion** for animations

### Backend
- **Node.js** with Express.js
- **TypeScript** with ES modules
- **In-memory storage** for development
- **Zod** for data validation
- **Scientific emission factors** based on GHG Protocol

### Development Tools
- **TSX** for TypeScript execution
- **Drizzle ORM** for database operations
- **Hot Module Replacement** for development
- **ESBuild** for production builds

## Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Quick Start

1. **Clone the repository**
```bash
git clone <repository-url>
cd carbon-emission-calculator
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Access the application**
- Open your browser to `http://localhost:5000`
- The application will be running with hot reload enabled

### Environment Setup

Create a `.env` file in the root directory:
```env
NODE_ENV=development
DATABASE_URL=your_database_url_here  # Optional for production
```

### Production Build

```bash
npm run build
npm start
```

## Usage

### Personal Carbon Footprint Calculator

1. **Navigate to the Calculator**
   - Click "Calculate Personal Footprint" from the homepage
   - Fill in your lifestyle information

2. **Required Information**
   - **Location**: Select your country from 56+ available options
   - **Energy**: Monthly electricity consumption (kWh)
   - **Transportation**: Weekly driving distance and public transport usage
   - **Travel**: Annual flight hours
   - **Diet**: Dietary preferences (plant-based, mixed, meat-heavy)
   - **Shopping**: Monthly spending on goods
   - **Waste**: Weekly waste generation (kg)

3. **View Results**
   - Total annual emissions in tonnes CO₂e
   - Category-wise breakdown with percentages
   - Performance comparison against global averages
   - Personalized reduction recommendations
   - 12-month emission forecast

### Industrial Carbon Footprint Calculator

1. **Navigate to Industrial Calculator**
   - Click "Calculate Industrial Footprint" from the homepage
   - Enter your organization's data

2. **Required Information**
   - **Company Details**: Industry type, size, and annual revenue
   - **Scope 1**: Natural gas consumption, diesel fuel usage
   - **Scope 2**: Grid electricity consumption, renewable energy percentage
   - **Scope 3**: Business travel, waste generation, water usage

3. **View Results**
   - GHG Protocol compliant emission calculations
   - Scope 1, 2, and 3 breakdowns
   - Industry benchmarking
   - Carbon intensity metrics
   - Access to carbon dashboard and offset registry

## Calculation Methodology

### Personal Emissions
- **Electricity**: Country-specific grid emission factors
- **Transportation**: Distance-based calculations with vehicle efficiency
- **Flights**: Hour-based calculations with radiative forcing
- **Diet**: Lifecycle assessment data for different dietary patterns
- **Shopping**: Spending-based emission factors
- **Waste**: Weight-based calculations with disposal methods

### Industrial Emissions
- **Scope 1**: Direct combustion emission factors
- **Scope 2**: Location-based grid emission factors
- **Scope 3**: Category-specific emission factors for business activities

### Emission Factors
- Based on GHG Protocol standards
- Country-specific electricity grid factors
- Updated with latest IPCC guidelines
- Includes 56+ countries with localized factors

## Data Sources

- **IPCC Guidelines**: Latest emission factors and methodologies
- **IEA**: International Energy Agency grid emission factors
- **EPA**: Environmental Protection Agency emission factors
- **DEFRA**: UK Department for Environment emission factors
- **Academic Research**: Peer-reviewed lifecycle assessment studies

## Features in Detail

### Visual Analytics
- **Donut Charts**: Clear category visualization with percentages
- **Bar Charts**: Comparative analysis across emission sources
- **Trend Lines**: Forecast projections with confidence intervals
- **Performance Cards**: Key metrics and benchmark comparisons

### Optimization Engine
- **Priority Ranking**: Recommendations sorted by impact potential
- **Cost-Benefit Analysis**: Reduction potential vs. implementation effort
- **Personalization**: Tailored suggestions based on user profile
- **Action Planning**: Step-by-step implementation guidance

### Benchmarking System
- **Global Averages**: World average emission comparisons
- **Country Benchmarks**: National average comparisons
- **Industry Standards**: Sector-specific benchmarking
- **Climate Targets**: 2030 and 2050 climate goal alignment

## API Endpoints

### Personal Calculator
```
POST /api/calculate/personal
```
**Request Body:**
```json
{
  "country": "United States",
  "electricityKwh": 800,
  "weeklyDrivingKm": 200,
  "annualFlightHours": 20,
  "publicTransportUsage": "occasionally",
  "dietType": "mixed",
  "monthlyShopping": 500,
  "weeklyWasteKg": 15
}
```

### Industrial Calculator
```
POST /api/calculate/industrial
```
**Request Body:**
```json
{
  "industryType": "Manufacturing",
  "companySize": "Medium (51-250 employees)",
  "annualRevenue": 50,
  "naturalGas": 50000,
  "dieselFuel": 10000,
  "gridElectricity": 500000,
  "renewableEnergy": 25,
  "businessTravel": 100000,
  "wasteGenerated": 50,
  "waterUsage": 5000
}
```

## Development

### Project Structure
```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utility functions
│   │   └── types/         # TypeScript types
├── server/                # Express backend
│   ├── lib/              # Server utilities
│   ├── routes.ts         # API routes
│   └── storage.ts        # Data storage
├── shared/               # Shared types and schemas
└── public/               # Static assets
```

### Key Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run linting
npm run type-check   # TypeScript type checking
```

### Adding New Features
1. Update shared schemas in `shared/schema.ts`
2. Modify backend calculations in `server/lib/calculations.ts`
3. Add frontend components in `client/src/components/`
4. Update API routes in `server/routes.ts`

## Contributing

### Development Guidelines
1. Follow TypeScript best practices
2. Use existing UI components from shadcn/ui
3. Maintain responsive design principles
4. Add proper error handling
5. Include loading states
6. Update documentation

### Code Style
- Use TypeScript for type safety
- Follow React hooks best practices
- Implement proper error boundaries
- Use semantic HTML elements
- Follow accessibility guidelines

## Deployment

### Replit Deployment
This application is optimized for Replit deployment:
1. Fork the repository on Replit
2. Run `npm install` to install dependencies
3. Start the application with `npm run dev`
4. Use Replit's deployment features for production

### Manual Deployment
1. Build the application: `npm run build`
2. Set environment variables
3. Deploy to your preferred hosting platform
4. Configure port and domain settings

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the repository or contact the development team.

## Changelog

### Latest Updates
- Enhanced pie chart visualization with donut chart style
- Removed AI terminology and replaced with optimization recommendations
- Implemented conditional action buttons for personal vs industrial results
- Added comprehensive country selection (56+ countries)
- Integrated waste calculation for personal carbon footprint
- Added performance benchmarking against global/industry averages
- Enhanced visual explanations and chart tooltips

## Acknowledgments

- GHG Protocol for emission calculation standards
- IPCC for climate science guidelines
- Open source community for development tools
- Environmental researchers for emission factor data