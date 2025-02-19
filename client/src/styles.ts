const styles = `html {
  --mi-black: #3E363F;
  --mi-white: #FFEEDB;
  --mi-pink: #BE3455;

  --mi-normal-background-color: var(--mi-white);
  --mi-light-background-color: #ffffee;
  --mi-lighten-background-color: rgba(255, 255, 255, 0.4);
  --mi-shade-background-color: rgba(0, 0, 0, .05);

  --mi-normal-foreground-color: var(--mi-black);
  --mi-light-foreground-color: #888;
  --mi-lighter-foreground-color: #bbb;

  --mi-primary-color: var(--mi-pink);
  --mi-primary-color--hover: var(--mi-pink);

  --mi-secondary-color: #ffb3d0;
  --mi-secondary-color--hover: #FF80B0;

  --mi-success-background-color: #4cdb5f;

  --mi-warning-color: #f04e37;
  --mi-warning-color--hover: #f26f59;
  --mi-warning-background-color: var(--mi-warning-color);
  --mi-darken-warning-background-color: #df250b;
  --mi-warning-foreground-color: white;

  --mi-primary-highlight-color: #bcb3ff;
  --mi-primary-highlight-color--hover: #FFB3D0;
  --mi-box-color: var(--mi-secondary-color);

  --mi-border-radius: 4px;
  --mi-border-radius-focus: 8px;
  
  --mi-icon-button-background-color: var(--mi-shade-background-color);
  --mi-icon-button-background-color--hover: rgba(0, 0, 0, 0.2);

  --mi-font-family-stack: 'Arial', -apple-system, BlinkMacSystemFont,
    'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
    'Droid Sans', 'Helvetica Neue', sans-serif;
}



@media (prefers-color-scheme: dark) {
  html {
    --mi-normal-background-color: var(--mi-black);
    --mi-normal-foreground-color: var(--mi-white);
    --mi-lighten-background-color: rgba(255, 255, 255, 0.05);
  }
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 20px;
  min-height: 100%;
}

body {
  background-color: var(--mi-normal-background-color);
  color: var(--mi-normal-foreground-color);
  font-family: var(--mi-font-family-stack);
}

body,
#root {
  min-height: 100%;
}

h1 {
  font-size: 2.5rem;
  line-height: 2;

  a {
    text-decoration: none;
    color: black;
  }
}

h2 {
  font-size: 1.9rem;
  line-height: 1.5;
  margin-bottom: 0.4rem;
}

h3 {
  font-size: 1.7rem;
  padding-bottom: 1rem;
}

h4 { 
  font-size: 1.4rem;
  padding-bottom: .75rem;
}

h5 {
  font-size: 1.2rem;
  padding-bottom: .75rem;
}

h6 {
  font-size: 1.1rem;
  padding-bottom: .75rem;
}

@media (max-width: 800px) {
  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.8rem;
  }
}

a {
  transition: .25s color, .25s background-color;
  color: var(--mi-primary-color);
}

@media (prefers-color-scheme: dark) {
  a {
    color: #F27D98;
  }
}

button {
  font-family: var(--mi-font-family-stack);
}

@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-3rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(3rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spinning {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`;

export default styles;
