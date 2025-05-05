import plugin from 'tailwindcss/plugin'

export default {
    plugins: [
        plugin(function({ addBase, theme }) {
            addBase({
              ':root': {
                  // Fluid typography from 1 rem to 1.2 rem with fallback to 20px.
                  fontSize: '20px',
                  letterSpacing: '-0.4px',
                  lineHeight: '1.125',
                  fontWeight: '400',

                  // Safari resize fix.
                  minHeight: '0vw',
              },
              // Default color transition on links unless user prefers reduced motion.
              '@media (prefers-reduced-motion: no-preference)': {
                'a': {
                  transition: 'color .3s ease-in-out',
                },
              },
              'html': {
                  color: theme('colors.neutral.DEFAULT'),
                  //--------------------------------------------------------------------------
                  // Set sans, serif or mono stack with optional custom font as default.
                  //--------------------------------------------------------------------------
                  // fontFamily: theme('fontFamily.mono'),
                  fontFamily: theme('fontFamily.sans'),
                  // fontFamily: theme('fontFamily.serif'),
              },
              'mark': {
                backgroundColor: theme('colors.primary.DEFAULT'),
                color: theme('colors.white')
              },
            })
          }),

          // Custom components for this particular site.
          plugin(function({ addComponents, theme }) {
              const components = {
                '.container': {
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    paddingLeft: `${theme('padding.4')}`,
                    paddingRight: `${theme('padding.4')}`,
                },
                '.container-fluid': {
                    width: '100%',
                    maxWidth: '100%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    paddingLeft: `${theme('padding.4')}`,
                    paddingRight: `${theme('padding.4')}`,
                },
                '.outer-grid': {
                    paddingTop: 0,
                    paddingBottom: 0,
                    rowGap: 0,
                    position: 'relative',
                    zIndex: 1,
                },
              }
              addComponents(components)
          }),

          // Custom utilities for this particular site.
          plugin(function({ addUtilities, theme, variants }) {
            const newUtilities = {
            }
            addUtilities(newUtilities)
          }),
          // Custom variants for this particular site.
          plugin(function ({ addVariant }) {
              addVariant('mobile-only', "@media screen and (max-width: calc(theme('screens.md') - 1px))");
              // instead of hard-coded 640px use sm breakpoint value from config. Or anything
              addVariant('tablet-only', "@media screen and (min-width: theme('screens.md')) and (max-width: calc(theme('screens.xl') - 1px))");
              addVariant('mbtb-only', "@media screen and (max-width: calc(theme('screens.xl') - 1px))");
          }),
    ],
}
