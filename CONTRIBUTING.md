# Contributing to Knowledge Camp Global

Thank you for your interest in contributing to Knowledge Camp Global! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/dge-camp-lms.git
   cd dge-camp-lms
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your local configuration
   ```

5. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

6. Run the development server:
   ```bash
   npm run dev
   ```

## Development Workflow

1. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following our coding standards

3. Test your changes:
   ```bash
   npm run lint
   npm run build
   ```

4. Commit your changes:
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

6. Create a Pull Request

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - A new feature
- `fix:` - A bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add course rating system
fix: resolve enrollment email sending issue
docs: update API documentation
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types/interfaces
- Avoid using `any` type
- Use meaningful variable and function names

### React/Next.js

- Use functional components with hooks
- Follow React best practices
- Keep components small and focused
- Use proper prop types

### Code Style

- Follow the existing code style
- Run ESLint before committing:
  ```bash
  npm run lint
  ```

### File Organization

```
src/
├── app/               # Next.js pages and API routes
├── components/        # Reusable React components
├── lib/              # Utility functions and configurations
└── types/            # TypeScript type definitions
```

## Database Changes

When making database changes:

1. Update the Prisma schema (`prisma/schema.prisma`)
2. Create a migration:
   ```bash
   npx prisma migrate dev --name your_migration_name
   ```
3. Generate Prisma Client:
   ```bash
   npx prisma generate
   ```

## Testing

- Write tests for new features
- Ensure existing tests pass
- Test edge cases and error scenarios

```bash
npm test
```

## Documentation

- Update README.md if needed
- Document new API endpoints in API.md
- Add JSDoc comments for complex functions
- Update deployment guide for infrastructure changes

## Pull Request Process

1. **Title**: Use a clear, descriptive title
2. **Description**: Explain what changes you made and why
3. **Screenshots**: Include screenshots for UI changes
4. **Testing**: Describe how you tested your changes
5. **Breaking Changes**: Clearly mark any breaking changes

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How was this tested?

## Screenshots (if applicable)

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-reviewed the code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Tests pass locally
```

## Feature Requests

To request a new feature:

1. Check if the feature already exists or has been requested
2. Create a detailed issue describing:
   - The problem you're trying to solve
   - Your proposed solution
   - Any alternatives you've considered
   - Additional context (screenshots, examples, etc.)

## Bug Reports

To report a bug:

1. Check if the bug has already been reported
2. Create an issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, Node version)

### Bug Report Template

```markdown
## Bug Description
A clear description of the bug

## To Reproduce
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Screenshots
If applicable

## Environment
- OS: [e.g., macOS, Windows, Linux]
- Browser: [e.g., Chrome, Firefox]
- Node Version: [e.g., 18.17.0]
- npm Version: [e.g., 9.6.7]
```

## Areas for Contribution

We especially welcome contributions in:

- **UI/UX improvements**: Enhance user interfaces and experiences
- **Performance optimization**: Improve loading times and efficiency
- **Accessibility**: Make the platform more accessible
- **Documentation**: Improve guides and API docs
- **Testing**: Add test coverage
- **Internationalization**: Add support for more languages
- **Mobile responsiveness**: Improve mobile experience

## Questions?

- Check existing documentation
- Search closed issues
- Ask in GitHub Discussions
- Email: developers@knowledgecamp.com

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

## Recognition

Contributors will be recognized in:
- README.md Contributors section
- Release notes for significant contributions
- Project documentation

Thank you for contributing to Knowledge Camp Global! 🎓
