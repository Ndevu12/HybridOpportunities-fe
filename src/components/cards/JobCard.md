# JobCard Component

A reusable, flexible job card component that can be used across the entire platform.

## Features

- **Multiple Variants**: `default`, `featured`, `compact`, `detailed`
- **Customizable**: Show/hide description, custom styling
- **Responsive**: Works on all screen sizes
- **Accessible**: Proper ARIA labels and keyboard navigation
- **Interactive**: Hover effects and click handling
- **Consistent**: Uses design system components

## Usage

### Basic Usage

```tsx
import { JobCard } from '../../components/cards';

<JobCard job={jobData} />
```

### Featured Jobs (HomePage)

```tsx
<JobCard
  job={job}
  variant="featured"
  showDescription={true}
/>
```

### Compact List View

```tsx
<JobCard
  job={job}
  variant="compact"
  showDescription={false}
  onClick={(jobId) => handleJobClick(jobId)}
/>
```

### Custom Styling

```tsx
<JobCard
  job={job}
  className="border-2 border-blue-200"
  showDescription={true}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `job` | `Job` | - | Job data object (required) |
| `variant` | `"default" \| "featured" \| "compact" \| "detailed"` | `"default"` | Card variant style |
| `showDescription` | `boolean` | `true` | Whether to show job description |
| `className` | `string` | `""` | Additional CSS classes |
| `onClick` | `(jobId: string) => void` | - | Click handler (optional) |

## Variants

### Default
- Standard job card with full information
- Used in job listings and search results

### Featured
- Enhanced styling for featured/promoted jobs
- Used on homepage and special sections

### Compact
- Minimal information display
- Used in sidebars and compact views

### Detailed
- Extended information display
- Used in detailed job views

## Examples

### Grid Layout (HomePage)
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {jobs.map((job) => (
    <JobCard
      key={job.id}
      job={job}
      variant="featured"
      showDescription={true}
    />
  ))}
</div>
```

### List Layout (JobList)
```tsx
<div className="space-y-4">
  {jobs.map((job) => (
    <JobCard
      key={job.id}
      job={job}
      variant="default"
      showDescription={true}
    />
  ))}
</div>
```

### Compact Sidebar
```tsx
<div className="space-y-2">
  {recentJobs.map((job) => (
    <JobCard
      key={job.id}
      job={job}
      variant="compact"
      showDescription={false}
      onClick={(jobId) => navigate(`/jobs/${jobId}`)}
    />
  ))}
</div>
```

## Styling

The component uses Tailwind CSS classes and can be customized with:

- **Background**: `bg-white/90 backdrop-blur-sm`
- **Hover Effects**: `hover:shadow-xl hover:scale-[1.02]`
- **Transitions**: `transition-all duration-300`
- **Shadows**: `shadow-md` with hover `shadow-xl`

## Accessibility

- Proper semantic HTML structure
- Keyboard navigation support
- Screen reader friendly
- Focus indicators
- ARIA labels for interactive elements
