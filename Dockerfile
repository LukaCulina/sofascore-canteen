# --- FAZA 1: Build aplikacije ---
    FROM node:22-alpine AS builder

    WORKDIR /app
    
    # Kopiramo definicije paketa i panda konfiguraciju
    COPY package.json yarn.lock panda.config.ts postcss.config.cjs ./
    
    # Instaliramo zavisnosti (sada panda codegen pronalazi config!)
    RUN yarn install --frozen-lockfile
    
    # Kopiramo sav preostali izvorni kod
    COPY . .
    
    # Pokrećemo build
    RUN yarn build
    
    # --- FAZA 2: Produkcijsko serviranje (Nginx) ---
    FROM nginx:alpine
    
    RUN rm -rf /usr/share/nginx/html/*
    
    COPY --from=builder /app/dist /usr/share/nginx/html
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    
    EXPOSE 80
    
    CMD ["nginx", "-g", "daemon off;"]