# Contributing to ADmyBRAND Insights

Thank you for your interest in contributing to ADmyBRAND Insights! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm (comes with Node.js)
- Git
- Basic knowledge of React, TypeScript, and Express.js

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/admybrand-insights.git
   cd admybrand-insights
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   Navigate to `http://localhost:5000`

## 📁 Project Structure

Understanding the project structure will help you contribute effectively:

```
admybrand-insights/
├── client/src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Route components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   └── ...
├── server/                 # Backend Express.js code
├── shared/                 # Shared types and schemas
└── ...
```

## 🎯 How to Contribute

### Reporting Issues

Before creating an issue, please:

1. **Search existing issues** to avoid duplicates
2. **Use the issue template** if available
3. **Provide detailed information**:
   - Steps to reproduce the problem
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Environment details (OS, browser, Node.js version)

### Suggesting Features

When suggesting new features:

1. **Check if it aligns** with the project's goals
2. **Provide a clear use case** and justification
3. **Consider the implementation complexity**
4. **Include mockups or examples** if helpful

### Code Contributions

#### Branch Naming Convention

Use descriptive branch names:
- `feature/add-user-authentication`
- `fix/sidebar-mobile-responsiveness`
- `refactor/optimize-chart-performance`
- `docs/update-api-documentation`

#### Development Workflow

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Follow the coding standards (see below)
   - Write tests for new functionality
   - Update documentation if needed

3. **Test Your Changes**
   ```bash
   npm run dev        # Start development server
   npm run build      # Test production build
   npm run type-check # Check TypeScript types
   ```

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add user authentication system"
   ```

5. **Push and Create Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

## 📝 Coding Standards

### TypeScript Guidelines

```typescript
// ✅ Good: Use descriptive names
interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  createdAt: Date;
}

// ✅ Good: Use proper type annotations
const fetchUserData = async (userId: string): Promise<UserProfile> => {
  // Implementation
};

// ❌ Avoid: Using 'any' type
const userData: any = await fetchData();

// ✅ Better: Use proper typing
const userData: UserProfile = await fetchUserData(userId);
```

### React Component Guidelines

```typescript
// ✅ Good: Use TypeScript interfaces for props
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  children,
  onClick 
}: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-md font-medium transition-colors',
        variantClasses[variant],
        sizeClasses[size],
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### CSS/Styling Guidelines

```css
/* ✅ Good: Use Tailwind utility classes */
<div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm">

/* ✅ Good: Use CSS variables for theming */
.custom-component {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  border: 1px solid hsl(var(--border));
}

/* ❌ Avoid: Hard-coded colors */
.bad-component {
  background-color: #ffffff;
  color: #000000;
}
```

### File Naming Conventions

- **Components**: PascalCase (`UserProfile.tsx`)
- **Utilities**: camelCase (`dateUtils.ts`)
- **Constants**: SCREAMING_SNAKE_CASE (`API_ENDPOINTS.ts`)
- **Types**: PascalCase (`UserTypes.ts`)

## 🧪 Testing Guidelines

### Component Testing

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables the button when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### API Testing

```typescript
import request from 'supertest';
import { app } from '../server';

describe('Campaigns API', () => {
  it('should get all campaigns', async () => {
    const response = await request(app)
      .get('/api/campaigns')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should create a new campaign', async () => {
    const newCampaign = {
      name: 'Test Campaign',
      budget: 1000,
      status: 'active'
    };

    const response = await request(app)
      .post('/api/campaigns')
      .send(newCampaign)
      .expect(201);

    expect(response.body.name).toBe(newCampaign.name);
    expect(response.body.id).toBeDefined();
  });
});
```

## 📚 Documentation

### Code Documentation

```typescript
/**
 * Calculates the conversion rate for a campaign
 * @param conversions - Number of conversions
 * @param clicks - Number of clicks
 * @returns Conversion rate as a percentage (0-100)
 * @example
 * const rate = calculateConversionRate(50, 1000); // returns 5
 */
export function calculateConversionRate(
  conversions: number, 
  clicks: number
): number {
  if (clicks === 0) return 0;
  return (conversions / clicks) * 100;
}
```

### README Updates

When adding new features, update the appropriate documentation:

- **README.md**: High-level feature descriptions
- **ARCHITECTURE.md**: Technical implementation details
- **API.md**: API endpoint documentation (if applicable)

## 🔍 Code Review Guidelines

### For Contributors

- **Self-review** your code before submitting
- **Write clear commit messages** following conventional commits
- **Keep PRs focused** - one feature/fix per PR
- **Respond promptly** to review feedback
- **Test thoroughly** on different devices/browsers

### For Reviewers

- **Be constructive** and specific in feedback
- **Focus on code quality**, not personal preferences
- **Check for security issues** and performance implications
- **Verify tests** cover the new functionality
- **Ensure documentation** is updated when needed

## 🎨 UI/UX Guidelines

### Design Principles

1. **Consistency**: Use existing components and patterns
2. **Accessibility**: Ensure WCAG 2.1 AA compliance
3. **Responsiveness**: Test on mobile, tablet, and desktop
4. **Performance**: Optimize for fast loading and smooth interactions

### Component Usage

```typescript
// ✅ Good: Use existing shadcn/ui components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// ✅ Good: Maintain consistent spacing
<div className="space-y-6 p-6">
  <Card>
    <CardHeader>
      <CardTitle>Analytics Overview</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {/* Content */}
    </CardContent>
  </Card>
</div>
```

### Accessibility Requirements

- **Keyboard Navigation**: All interactive elements must be keyboard accessible
- **Screen Reader Support**: Use semantic HTML and ARIA labels
- **Color Contrast**: Ensure sufficient contrast ratios
- **Focus Indicators**: Visible focus states for all interactive elements

## 🐛 Debugging Tips

### Common Issues

1. **TypeScript Errors**
   ```bash
   npm run type-check
   ```

2. **Build Failures**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Port Conflicts**
   ```bash
   # Kill process on port 5000
   lsof -ti:5000 | xargs kill -9
   ```

### Development Tools

- **React DevTools**: Browser extension for React debugging
- **Redux DevTools**: For state management debugging
- **VS Code Extensions**:
  - TypeScript Importer
  - Tailwind CSS IntelliSense
  - ES7+ React/Redux/React-Native snippets

## 🚀 Release Process

### Version Numbering

We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

Examples:
- `feat(dashboard): add real-time chart updates`
- `fix(auth): resolve login redirect issue`
- `docs(readme): update installation instructions`
- `refactor(components): simplify modal component structure`

### Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## 📞 Getting Help

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and discussions
- **Code Review**: Pull request comments

### Resources

- **React Documentation**: https://react.dev/
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **shadcn/ui Components**: https://ui.shadcn.com/

## 🙏 Recognition

Contributors will be recognized in:
- **README.md** contributors section
- **CHANGELOG.md** for significant contributions
- **GitHub** contributors page

Thank you for contributing to ADmyBRAND Insights! 🎉