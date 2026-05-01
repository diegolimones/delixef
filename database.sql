-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create menus table
CREATE TABLE IF NOT EXISTS menus (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL CHECK (category IN ('desayuno', 'comida', 'cena', 'evento')),
  price DECIMAL(10, 2),
  image_url VARCHAR(500),
  ingredients TEXT,
  dietary_restrictions VARCHAR(255),
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES admin_users(id) ON DELETE SET NULL
);

-- Create disponibilidad table
CREATE TABLE IF NOT EXISTS disponibilidad (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL,
  time_slot VARCHAR(50) NOT NULL CHECK (time_slot IN ('desayuno', 'comida', 'cena')),
  max_reservas INT DEFAULT 1,
  current_reservas INT DEFAULT 0,
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(date, time_slot)
);

-- Create reservas table
CREATE TABLE IF NOT EXISTS reservas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  client_phone VARCHAR(20),
  reservation_date DATE NOT NULL,
  time_slot VARCHAR(50) NOT NULL CHECK (time_slot IN ('desayuno', 'comida', 'cena')),
  number_of_people INT NOT NULL CHECK (number_of_people > 0),
  menu_preference TEXT,
  dietary_restrictions TEXT,
  special_requests TEXT,
  status VARCHAR(50) DEFAULT 'pendiente' CHECK (status IN ('pendiente', 'confirmada', 'cancelada')),
  event_type VARCHAR(50),
  google_calendar_event_id VARCHAR(500),
  confirmation_token VARCHAR(255) UNIQUE,
  confirmed BOOLEAN DEFAULT FALSE,
  confirmed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_reservas_date ON reservas(reservation_date);
CREATE INDEX idx_reservas_email ON reservas(client_email);
CREATE INDEX idx_reservas_status ON reservas(status);
CREATE INDEX idx_disponibilidad_date ON disponibilidad(date);
CREATE INDEX idx_menus_category ON menus(category);
CREATE INDEX idx_admin_email ON admin_users(email);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE disponibilidad ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservas ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admin_users (only authenticated admins can view their own data)
CREATE POLICY admin_users_view ON admin_users
  FOR SELECT
  USING (auth.uid()::text = id::text);

CREATE POLICY admin_users_insert ON admin_users
  FOR INSERT
  WITH CHECK (FALSE);

-- RLS Policies for menus (public read, admin write)
CREATE POLICY menus_public_read ON menus
  FOR SELECT
  USING (available = TRUE);

CREATE POLICY menus_admin_read ON menus
  FOR SELECT
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY menus_admin_write ON menus
  FOR ALL
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- RLS Policies for disponibilidad (public read, admin write)
CREATE POLICY disponibilidad_public_read ON disponibilidad
  FOR SELECT
  USING (TRUE);

CREATE POLICY disponibilidad_admin_write ON disponibilidad
  FOR ALL
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- RLS Policies for reservas (public insert, users see own, admin sees all)
CREATE POLICY reservas_public_insert ON reservas
  FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY reservas_select_own ON reservas
  FOR SELECT
  USING (client_email = CURRENT_USER OR EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY reservas_admin_all ON reservas
  FOR ALL
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menus_updated_at BEFORE UPDATE ON menus
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_disponibilidad_updated_at BEFORE UPDATE ON disponibilidad
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reservas_updated_at BEFORE UPDATE ON reservas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
