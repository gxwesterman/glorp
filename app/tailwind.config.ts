module.exports = {
  theme: {
    extend: {
      typography: () => ({
        teal: {
          css: {
            '--tw-prose-invert-bullets': 'var(--color-teal-500)',
            '--tw-prose-invert-counters': 'var(--color-teal-500)',
          },
        },
      }),
    },
  },
};