/*
  # Add settings fields to profiles table

  1. Changes
    - Add new columns for settings:
      - sound (boolean)
      - theme (text)
      - privacy (text)
    - Set default values for new columns
  
  2. Security
    - No changes to RLS policies (using existing ones)
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'sound'
  ) THEN
    ALTER TABLE profiles ADD COLUMN sound boolean DEFAULT true;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'theme'
  ) THEN
    ALTER TABLE profiles ADD COLUMN theme text DEFAULT 'light';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'privacy'
  ) THEN
    ALTER TABLE profiles ADD COLUMN privacy text DEFAULT 'private';
  END IF;
END $$;