module.exports = {
  theme: {
    extend: {
      typography: () => ({
        teal: {
          css: {
            '--tw-prose-invert-bullets': 'var(--color-teal-600)',
          },
        },
      }),
    },
  },
};