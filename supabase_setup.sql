-- ==========================================
-- EcoPredictAI Database Setup & Seeding Script
-- Execute this script inside the Supabase SQL Editor
-- ==========================================

DROP TABLE IF EXISTS species_data CASCADE;

CREATE TABLE species_data (
  id TEXT PRIMARY KEY,
  common_name TEXT NOT NULL,
  scientific_name TEXT NOT NULL,
  status TEXT NOT NULL,
  current_population INT NOT NULL,
  trend TEXT NOT NULL,
  population_change TEXT NOT NULL,
  region TEXT[] NOT NULL,
  countries TEXT[] NOT NULL,
  habitat TEXT NOT NULL,
  threat_level TEXT NOT NULL,
  threats JSONB NOT NULL,
  population_history JSONB NOT NULL,
  predicted_population JSONB NOT NULL,
  recommendations JSONB NOT NULL,
  data_sources TEXT[] NOT NULL,
  last_updated TEXT NOT NULL,
  records_used INT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  image_source TEXT,
  image_author TEXT,
  image_license TEXT,
  is_published BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE species_data ENABLE ROW LEVEL SECURITY;

-- Create Public Read Policy
CREATE POLICY "Allow public read access" ON species_data
  FOR SELECT USING (true);

-- Create Authenticated/Anon Insert/Update Policy (so admins can add/update)
CREATE POLICY "Allow anon/authenticated insert access" ON species_data
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anon/authenticated update access" ON species_data
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow anon/authenticated delete access" ON species_data
  FOR DELETE USING (true);

-- Insert 52 unique species records

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'tiger',
  'Bengal Tiger',
  'Panthera tigris',
  'Endangered',
  3700,
  'Declining',
  '-4.2%',
  '{
    "Asia"
  }',
  '{
    "India",
    "Bangladesh",
    "Nepal",
    "Bhutan"
  }',
  'Mangrove Forests & Deciduous Forests',
  'High',
  '[{"name":"Habitat Loss","severity":75},{"name":"Poaching","severity":65},{"name":"Human-Wildlife Conflict","severity":55},{"name":"Prey Decline","severity":45}]'::jsonb,
  '[{"year":2016,"population":4313},{"year":2018,"population":4196},{"year":2020,"population":4055},{"year":2022,"population":3944},{"year":2024,"population":3823},{"year":2026,"population":3700}]'::jsonb,
  '[{"year":2028,"population":3624},{"year":2030,"population":3490},{"year":2032,"population":3352},{"year":2035,"population":3272}]'::jsonb,
  '[{"title":"Establish Protected Zones for Habitat Loss","priority":"HIGH","reason":"Severe threats from Habitat Loss directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"HIGH","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Human-Wildlife Conflict via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "IUCN Red List",
    "WTI Conservation Records",
    "WWF Field Census"
  }',
  '18 August 2026',
  1248,
  'Bengal tigers live in India and surrounding regions. They are apex predators that regulate prey populations and stabilize forest ecosystems. Key concerns are poaching and massive habitat fragmentation.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Tiger_in_Ranthambhore.jpg/640px-Tiger_in_Ranthambhore.jpg',
  'Wikimedia Commons',
  'Koshy Koshy',
  'CC BY 2.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'amur_leopard',
  'Amur Leopard',
  'Panthera pardus orientalis',
  'Critically Endangered',
  120,
  'Increasing',
  '+8.4%',
  '{
    "Asia"
  }',
  '{
    "Russia",
    "China"
  }',
  'Temperate Forests',
  'Critical',
  '[{"name":"Inbreeding Depression","severity":85},{"name":"Poaching","severity":75},{"name":"Forest Fires","severity":65},{"name":"Prey Scarcity","severity":55}]'::jsonb,
  '[{"year":2016,"population":109},{"year":2018,"population":111},{"year":2020,"population":113},{"year":2022,"population":115},{"year":2024,"population":118},{"year":2026,"population":120}]'::jsonb,
  '[{"year":2028,"population":122},{"year":2030,"population":124},{"year":2032,"population":126},{"year":2035,"population":130}]'::jsonb,
  '[{"title":"Establish Protected Zones for Inbreeding Depression","priority":"HIGH","reason":"Severe threats from Inbreeding Depression directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"HIGH","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Forest Fires via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Land of the Leopard National Park",
    "WWF Russia"
  }',
  '18 August 2026',
  742,
  'The Amur leopard is native to the Primorye region of southeastern Russia and northern China. It is one of the rarest big cats in the world. Strict anti-poaching measures have helped its numbers slightly recover.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Amur_Leopard_sitting.jpg/640px-Amur_Leopard_sitting.jpg',
  'Wikimedia Commons',
  'Appaloosa',
  'CC BY-SA 3.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'leopard',
  'Snow Leopard',
  'Panthera uncia',
  'Vulnerable',
  4500,
  'Declining',
  '-3.8%',
  '{
    "Asia"
  }',
  '{
    "China",
    "Mongolia",
    "India",
    "Nepal",
    "Kyrgyzstan"
  }',
  'Alpine & Subalpine Zones',
  'High',
  '[{"name":"Climate Stress","severity":75},{"name":"Retaliatory Killings","severity":65},{"name":"Habitat Fragmentation","severity":55},{"name":"Illegal Trade","severity":45}]'::jsonb,
  '[{"year":2016,"population":5257},{"year":2018,"population":5087},{"year":2020,"population":4940},{"year":2022,"population":4772},{"year":2024,"population":4638},{"year":2026,"population":4500}]'::jsonb,
  '[{"year":2028,"population":4395},{"year":2030,"population":4295},{"year":2032,"population":4135},{"year":2035,"population":3987}]'::jsonb,
  '[{"title":"Establish Protected Zones for Climate Stress","priority":"HIGH","reason":"Severe threats from Climate Stress directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"MEDIUM","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Habitat Fragmentation via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Snow Leopard Trust",
    "IUCN Alpine Survey",
    "WWF Nepal Records"
  }',
  '18 August 2026',
  890,
  'Snow leopards live in high mountain ranges across Central Asia. They are adapted to cold, rugged terrains but face severe threats from warming global temperatures and conflict with local livestock herders.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Snow_leopard_portrait.jpg/640px-Snow_leopard_portrait.jpg',
  'Wikimedia Commons',
  'Bernard Landgraf',
  'CC BY-SA 3.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'sumatran_tiger',
  'Sumatran Tiger',
  'Panthera tigris sumatrae',
  'Critically Endangered',
  400,
  'Declining',
  '-6.5%',
  '{
    "Asia"
  }',
  '{
    "Indonesia"
  }',
  'Lowland & Montane Rainforests',
  'Critical',
  '[{"name":"Deforestation","severity":85},{"name":"Poaching","severity":75},{"name":"Human Conflict","severity":65},{"name":"Palm Oil Plantations","severity":55}]'::jsonb,
  '[{"year":2016,"population":467},{"year":2018,"population":451},{"year":2020,"population":439},{"year":2022,"population":424},{"year":2024,"population":411},{"year":2026,"population":400}]'::jsonb,
  '[{"year":2028,"population":390},{"year":2030,"population":376},{"year":2032,"population":368},{"year":2035,"population":357}]'::jsonb,
  '[{"title":"Establish Protected Zones for Deforestation","priority":"HIGH","reason":"Severe threats from Deforestation directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"HIGH","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Human Conflict via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Ministry of Forestry Indonesia",
    "WWF Indonesia"
  }',
  '18 August 2026',
  520,
  'Sumatran tigers are the only surviving tiger subspecies in Indonesia. They reside in fragmented forests across Sumatra, threatened by rapid agricultural encroachment and logging.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Sumatran_Tiger_Berlin_Tierpark.jpg/640px-Sumatran_Tiger_Berlin_Tierpark.jpg',
  'Wikimedia Commons',
  'Srecko Radivojevic',
  'Public Domain',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'sumatran_rhino',
  'Sumatran Rhinoceros',
  'Dicerorhinus sumatrensis',
  'Critically Endangered',
  80,
  'Declining',
  '-12.3%',
  '{
    "Asia"
  }',
  '{
    "Indonesia"
  }',
  'Tropical Rainforests & Swamps',
  'Critical',
  '[{"name":"Small Population Size","severity":85},{"name":"Poaching","severity":75},{"name":"Habitat Loss","severity":65},{"name":"Low Breeding Rate","severity":55}]'::jsonb,
  '[{"year":2016,"population":92},{"year":2018,"population":89},{"year":2020,"population":87},{"year":2022,"population":84},{"year":2024,"population":82},{"year":2026,"population":80}]'::jsonb,
  '[{"year":2028,"population":78},{"year":2030,"population":76},{"year":2032,"population":74},{"year":2035,"population":72}]'::jsonb,
  '[{"title":"Establish Protected Zones for Small Population Size","priority":"HIGH","reason":"Severe threats from Small Population Size directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"HIGH","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Habitat Loss via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "International Rhino Foundation",
    "IUCN Rhino Specialist Group"
  }',
  '18 August 2026',
  310,
  'The Sumatran rhino is the smallest of all living rhinoceroses and the only two-horned rhino in Asia. Extremely low numbers make finding mates in the wild difficult.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Sumatran_Rhino_Harapan.jpg/640px-Sumatran_Rhino_Harapan.jpg',
  'Wikimedia Commons',
  'Wulan Pusparini',
  'CC BY-SA 4.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'javan_rhino',
  'Javan Rhinoceros',
  'Rhinoceros sondaicus',
  'Critically Endangered',
  76,
  'Stable',
  '0.0%',
  '{
    "Asia"
  }',
  '{
    "Indonesia"
  }',
  'Coastal Rain Forests',
  'Critical',
  '[{"name":"Natural Catastrophes","severity":85},{"name":"Disease","severity":75},{"name":"Small Population Size","severity":65},{"name":"Invasive Plants","severity":55}]'::jsonb,
  '[{"year":2016,"population":76},{"year":2018,"population":76},{"year":2020,"population":76},{"year":2022,"population":76},{"year":2024,"population":76},{"year":2026,"population":76}]'::jsonb,
  '[{"year":2028,"population":77},{"year":2030,"population":77},{"year":2032,"population":77},{"year":2035,"population":77}]'::jsonb,
  '[{"title":"Establish Protected Zones for Natural Catastrophes","priority":"HIGH","reason":"Severe threats from Natural Catastrophes directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"HIGH","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Small Population Size via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Ujung Kulon National Park Authority",
    "Save the Rhino"
  }',
  '18 August 2026',
  220,
  'Javan rhinos survive exclusively in Ujung Kulon National Park on the western tip of Java. Since they are restricted to a single location, the species is vulnerable to natural disasters like tsunamis or volcanic eruptions.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Javan_Rhinoceros.jpg/640px-Javan_Rhinoceros.jpg',
  'Wikimedia Commons',
  'Anwar S.',
  'CC BY-SA 4.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'elephant',
  'Asian Elephant',
  'Elephas maximus',
  'Endangered',
  48400,
  'Declining',
  '-2.5%',
  '{
    "Asia"
  }',
  '{
    "India",
    "Sri Lanka",
    "Thailand",
    "Myanmar"
  }',
  'Tropical Forests & Grasslands',
  'High',
  '[{"name":"Habitat Loss","severity":75},{"name":"Human Conflict","severity":65},{"name":"Linear Infrastructure","severity":55},{"name":"Poaching","severity":45}]'::jsonb,
  '[{"year":2016,"population":56726},{"year":2018,"population":54921},{"year":2020,"population":53386},{"year":2022,"population":51838},{"year":2024,"population":50143},{"year":2026,"population":48400}]'::jsonb,
  '[{"year":2028,"population":46535},{"year":2030,"population":45211},{"year":2032,"population":43855},{"year":2035,"population":42224}]'::jsonb,
  '[{"title":"Establish Protected Zones for Habitat Loss","priority":"HIGH","reason":"Severe threats from Habitat Loss directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"MEDIUM","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Linear Infrastructure via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Project Elephant India",
    "IUCN Asian Elephant Group",
    "WWF Grasslands Data"
  }',
  '18 August 2026',
  2154,
  'Asian elephants play vital roles in shaping tropical forests but face habitat loss from expanding agriculture and linear blockages like roads or railways that block their migratory paths.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Elephas_maximus_%28Bandipur%29.jpg/640px-Elephas_maximus_%28Bandipur%29.jpg',
  'Wikimedia Commons',
  'Yathin S. Krishnappa',
  'CC BY-SA 3.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'red_panda',
  'Red Panda',
  'Ailurus fulgens',
  'Endangered',
  10000,
  'Declining',
  '-5.2%',
  '{
    "Asia"
  }',
  '{
    "Nepal",
    "India",
    "Bhutan",
    "China",
    "Myanmar"
  }',
  'Montane Forest with Bamboo Understory',
  'High',
  '[{"name":"Deforestation","severity":75},{"name":"Poaching","severity":65},{"name":"Livestock Trampling","severity":55},{"name":"Climate Stress","severity":45}]'::jsonb,
  '[{"year":2016,"population":11571},{"year":2018,"population":11268},{"year":2020,"population":10910},{"year":2022,"population":10636},{"year":2024,"population":10277},{"year":2026,"population":10000}]'::jsonb,
  '[{"year":2028,"population":9720},{"year":2030,"population":9460},{"year":2032,"population":9191},{"year":2035,"population":8831}]'::jsonb,
  '[{"title":"Establish Protected Zones for Deforestation","priority":"HIGH","reason":"Severe threats from Deforestation directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"HIGH","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Livestock Trampling via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Red Panda Network",
    "IUCN Red List"
  }',
  '18 August 2026',
  940,
  'Red pandas live in the Himalayas and are specialized bamboo feeders. They are threatened by forest clearing for agriculture and grazing livestock, which fragments their canopy habitats.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Red_Panda_Ailurus_fulgens.jpg/640px-Red_Panda_Ailurus_fulgens.jpg',
  'Wikimedia Commons',
  'Greg Hume',
  'CC BY-SA 3.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'saola',
  'Saola',
  'Pseudoryx nghetinhensis',
  'Critically Endangered',
  50,
  'Declining',
  '-15.0%',
  '{
    "Asia"
  }',
  '{
    "Vietnam",
    "Laos"
  }',
  'Evergreen Forests',
  'Critical',
  '[{"name":"Snaring","severity":85},{"name":"Forest Fragmentation","severity":75},{"name":"Small Population Size","severity":65},{"name":"Hunting","severity":55}]'::jsonb,
  '[{"year":2016,"population":58},{"year":2018,"population":56},{"year":2020,"population":55},{"year":2022,"population":53},{"year":2024,"population":51},{"year":2026,"population":50}]'::jsonb,
  '[{"year":2028,"population":49},{"year":2030,"population":47},{"year":2032,"population":46},{"year":2035,"population":45}]'::jsonb,
  '[{"title":"Establish Protected Zones for Snaring","priority":"HIGH","reason":"Severe threats from Snaring directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"HIGH","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Small Population Size via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Saola Working Group",
    "WWF Indochina"
  }',
  '18 August 2026',
  98,
  'Known as the Asian Unicorn, the saola resides in the Annamite Range along the Vietnam-Laos border. It is rarely seen and remains severely threatened by indiscriminate bushmeat snaring.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Saola_Pseudoryx_nghetinhensis.jpg/640px-Saola_Pseudoryx_nghetinhensis.jpg',
  'Wikimedia Commons',
  'William Robichaud',
  'CC BY-SA 4.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'gharial',
  'Gharial',
  'Gavialis gangeticus',
  'Critically Endangered',
  650,
  'Stable',
  '0.0%',
  '{
    "Asia"
  }',
  '{
    "India",
    "Nepal"
  }',
  'Deep Fast-Flowing Rivers',
  'Critical',
  '[{"name":"Dam Construction","severity":85},{"name":"Sand Mining","severity":75},{"name":"Gillnet Entanglement","severity":65},{"name":"Fish Depletion","severity":55}]'::jsonb,
  '[{"year":2016,"population":653},{"year":2018,"population":652},{"year":2020,"population":650},{"year":2022,"population":649},{"year":2024,"population":649},{"year":2026,"population":650}]'::jsonb,
  '[{"year":2028,"population":653},{"year":2030,"population":650},{"year":2032,"population":646},{"year":2035,"population":641}]'::jsonb,
  '[{"title":"Establish Protected Zones for Dam Construction","priority":"HIGH","reason":"Severe threats from Dam Construction directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"HIGH","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Gillnet Entanglement via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Gharial Conservation Alliance",
    "Madras Crocodile Bank Trust"
  }',
  '18 August 2026',
  430,
  'The gharial is a distinct crocodilian with a long, thin snout specialized for catching fish. Their main threats include sand mining and river regulation, which destroy nesting beaches.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Gharial_at_Chambal.jpg/640px-Gharial_at_Chambal.jpg',
  'Wikimedia Commons',
  'Charles J. Sharp',
  'CC BY-SA 4.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'irrawaddy_dolphin',
  'Irrawaddy Dolphin',
  'Orcaella brevirostris',
  'Endangered',
  90,
  'Declining',
  '-8.2%',
  '{
    "Asia",
    "Marine"
  }',
  '{
    "Cambodia",
    "Myanmar",
    "Indonesia"
  }',
  'River Estuaries & Coastal Waters',
  'High',
  '[{"name":"Bycatch","severity":75},{"name":"Gillnet Entanglement","severity":65},{"name":"Dam Building","severity":55},{"name":"Tourism Harassment","severity":45}]'::jsonb,
  '[{"year":2016,"population":104},{"year":2018,"population":101},{"year":2020,"population":98},{"year":2022,"population":95},{"year":2024,"population":92},{"year":2026,"population":90}]'::jsonb,
  '[{"year":2028,"population":87},{"year":2030,"population":84},{"year":2032,"population":82},{"year":2035,"population":79}]'::jsonb,
  '[{"title":"Establish Protected Zones for Bycatch","priority":"HIGH","reason":"Severe threats from Bycatch directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"MEDIUM","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Dam Building via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Mekong Dolphin Project",
    "WWF Cambodia"
  }',
  '18 August 2026',
  380,
  'Irrawaddy dolphins reside in rivers and estuaries in Southeast Asia. The Mekong River subpopulation is extremely low and suffers from high mortality due to accidental net entanglement.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Orcaella_brevirostris_Irrawaddy_Dolphin.jpg/640px-Orcaella_brevirostris_Irrawaddy_Dolphin.jpg',
  'Wikimedia Commons',
  'Stefan Bennett',
  'Public Domain',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'yangtze_porpoise',
  'Yangtze Finless Porpoise',
  'Neophocaena asiaeorientalis asiaeorientalis',
  'Critically Endangered',
  1000,
  'Stable',
  '0.0%',
  '{
    "Asia"
  }',
  '{
    "China"
  }',
  'Yangtze River Mainstream',
  'Critical',
  '[{"name":"Industrial Pollution","severity":85},{"name":"Boat Collisions","severity":75},{"name":"Overfishing","severity":65},{"name":"River Modification","severity":55}]'::jsonb,
  '[{"year":2016,"population":993},{"year":2018,"population":991},{"year":2020,"population":995},{"year":2022,"population":995},{"year":2024,"population":998},{"year":2026,"population":1000}]'::jsonb,
  '[{"year":2028,"population":991},{"year":2030,"population":996},{"year":2032,"population":1006},{"year":2035,"population":1000}]'::jsonb,
  '[{"title":"Establish Protected Zones for Industrial Pollution","priority":"HIGH","reason":"Severe threats from Industrial Pollution directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"HIGH","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Overfishing via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Yangtze River Fisheries Commission",
    "Wuhan Institute of Hydrobiology"
  }',
  '18 August 2026',
  620,
  'This freshwater porpoise is often called the Water Panda. Since the baiji dolphin extinction, it is the sole cetacean left in the Yangtze River. Intense boat traffic and dredging restrict its survival.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Yangtze_Finless_Porpoise_Wuhan.jpg/640px-Yangtze_Finless_Porpoise_Wuhan.jpg',
  'Wikimedia Commons',
  'Baiji.org',
  'CC BY-SA 3.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'sunda_pangolin',
  'Sunda Pangolin',
  'Manis javanica',
  'Critically Endangered',
  50000,
  'Declining',
  '-14.6%',
  '{
    "Asia"
  }',
  '{
    "Malaysia",
    "Indonesia",
    "Thailand",
    "Vietnam"
  }',
  'Primary & Secondary Forests',
  'Critical',
  '[{"name":"Poaching for Scales","severity":85},{"name":"Illegal Pet Trade","severity":75},{"name":"Deforestation","severity":65},{"name":"Habitat Loss","severity":55}]'::jsonb,
  '[{"year":2016,"population":58682},{"year":2018,"population":56772},{"year":2020,"population":54871},{"year":2022,"population":53161},{"year":2024,"population":51424},{"year":2026,"population":50000}]'::jsonb,
  '[{"year":2028,"population":48451},{"year":2030,"population":47187},{"year":2032,"population":45694},{"year":2035,"population":43866}]'::jsonb,
  '[{"title":"Establish Protected Zones for Poaching for Scales","priority":"HIGH","reason":"Severe threats from Poaching for Scales directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"HIGH","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Deforestation via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "TRAFFIC Southeast Asia",
    "IUCN Pangolin Specialist Group"
  }',
  '18 August 2026',
  1120,
  'The Sunda pangolin is heavily poached for its keratin scales and meat. It is nocturnal and feeds on ants and termites, playing an important role in controlling forest insect populations.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Sunda_Pangolin.jpg/640px-Sunda_Pangolin.jpg',
  'Wikimedia Commons',
  'Piekfrosch',
  'CC BY-SA 3.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'chinese_pangolin',
  'Chinese Pangolin',
  'Manis pentadactyla',
  'Critically Endangered',
  25000,
  'Declining',
  '-18.1%',
  '{
    "Asia"
  }',
  '{
    "China",
    "Taiwan",
    "Nepal",
    "India"
  }',
  'Subtropical Forests & Hills',
  'Critical',
  '[{"name":"Poaching","severity":85},{"name":"Traditional Medicine Trade","severity":75},{"name":"Habitat Encroachment","severity":65},{"name":"Pesticides","severity":55}]'::jsonb,
  '[{"year":2016,"population":29269},{"year":2018,"population":28293},{"year":2020,"population":27431},{"year":2022,"population":26499},{"year":2024,"population":25771},{"year":2026,"population":25000}]'::jsonb,
  '[{"year":2028,"population":24155},{"year":2030,"population":23591},{"year":2032,"population":23114},{"year":2035,"population":22497}]'::jsonb,
  '[{"title":"Establish Protected Zones for Poaching","priority":"HIGH","reason":"Severe threats from Poaching directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"HIGH","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Habitat Encroachment via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Taiwan Forestry Research Institute",
    "IUCN Red List"
  }',
  '18 August 2026',
  840,
  'Chinese pangolins dig deep burrows and curl into armoured balls when threatened. They are heavily collected for scale-based traditional remedies, causing steep population declines.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Manis_pentadactyla.jpg/640px-Manis_pentadactyla.jpg',
  'Wikimedia Commons',
  'Kurtis Lai',
  'CC BY-SA 4.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'indian_pangolin',
  'Indian Pangolin',
  'Manis crassicaudata',
  'Endangered',
  40000,
  'Declining',
  '-8.5%',
  '{
    "Asia"
  }',
  '{
    "India",
    "Pakistan",
    "Sri Lanka",
    "Nepal"
  }',
  'Arid Plains & Grasslands',
  'High',
  '[{"name":"Poaching","severity":75},{"name":"Habitat Loss","severity":65},{"name":"Roadkill","severity":55},{"name":"Local Bushmeat Consumption","severity":45}]'::jsonb,
  '[{"year":2016,"population":46450},{"year":2018,"population":45147},{"year":2020,"population":43575},{"year":2022,"population":42461},{"year":2024,"population":41143},{"year":2026,"population":40000}]'::jsonb,
  '[{"year":2028,"population":38913},{"year":2030,"population":37799},{"year":2032,"population":36974},{"year":2035,"population":36134}]'::jsonb,
  '[{"title":"Establish Protected Zones for Poaching","priority":"HIGH","reason":"Severe threats from Poaching directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"MEDIUM","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Roadkill via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Wildlife Trust of India",
    "WCCB India Records"
  }',
  '18 August 2026',
  690,
  'The Indian pangolin is a scale-covered insectivore found in plains and hills. Poaching for local and international markets is causing its numbers to shrink rapidly.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Indian_Pangolin_by_Sandip_Kumar.jpg/640px-Indian_Pangolin_by_Sandip_Kumar.jpg',
  'Wikimedia Commons',
  'Sandip Kumar',
  'CC BY-SA 4.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'gorilla',
  'Mountain Gorilla',
  'Gorilla beringei beringei',
  'Endangered',
  1063,
  'Increasing',
  '+1.5%',
  '{
    "Africa"
  }',
  '{
    "Rwanda",
    "Uganda",
    "DR Congo"
  }',
  'Cloud Forests & Montane Slopes',
  'High',
  '[{"name":"Habitat Encroachment","severity":75},{"name":"Disease Transmission","severity":65},{"name":"Armed Conflict","severity":55},{"name":"Poaching snares","severity":45}]'::jsonb,
  '[{"year":2016,"population":970},{"year":2018,"population":986},{"year":2020,"population":1003},{"year":2022,"population":1024},{"year":2024,"population":1046},{"year":2026,"population":1063}]'::jsonb,
  '[{"year":2028,"population":1085},{"year":2030,"population":1106},{"year":2032,"population":1138},{"year":2035,"population":1158}]'::jsonb,
  '[{"title":"Establish Protected Zones for Habitat Encroachment","priority":"HIGH","reason":"Severe threats from Habitat Encroachment directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"MEDIUM","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Armed Conflict via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Dian Fossey Gorilla Fund",
    "Virunga National Park Agency",
    "IGCP Survey"
  }',
  '18 August 2026',
  1063,
  'Mountain gorillas are restricted to volcanic slopes and montane forests in East Africa. Intensive local monitoring and community conservation programs have successfully stabilized their numbers.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Mountain_gorilla_in_Bwindi.jpg/640px-Mountain_gorilla_in_Bwindi.jpg',
  'Wikimedia Commons',
  'Dave Proffer',
  'CC BY 2.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'lowland_gorilla',
  'Eastern Lowland Gorilla',
  'Gorilla beringei graueri',
  'Critically Endangered',
  3800,
  'Declining',
  '-9.0%',
  '{
    "Africa"
  }',
  '{
    "DR Congo"
  }',
  'Tropical Lowland Rainforests',
  'Critical',
  '[{"name":"Illegal Mining","severity":85},{"name":"Civil Unrest","severity":75},{"name":"Bushmeat Hunting","severity":65},{"name":"Habitat Loss","severity":55}]'::jsonb,
  '[{"year":2016,"population":4459},{"year":2018,"population":4317},{"year":2020,"population":4209},{"year":2022,"population":4065},{"year":2024,"population":3932},{"year":2026,"population":3800}]'::jsonb,
  '[{"year":2028,"population":3698},{"year":2030,"population":3556},{"year":2032,"population":3423},{"year":2035,"population":3339}]'::jsonb,
  '[{"title":"Establish Protected Zones for Illegal Mining","priority":"HIGH","reason":"Severe threats from Illegal Mining directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"HIGH","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Bushmeat Hunting via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Kahuzi-Biega National Park Authority",
    "WCS Congo"
  }',
  '18 August 2026',
  590,
  'Also known as Grauer''s gorilla, this subspecies is endemic to eastern DR Congo. Illegal coltan mining and civil unrest in their range have opened forests to hunters, severely reducing their population.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Grauer%27s_gorilla.jpg/640px-Grauer%27s_gorilla.jpg',
  'Wikimedia Commons',
  'A. J. Plumptre',
  'CC BY-SA 4.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'black_rhino',
  'Black Rhinoceros',
  'Rhinoceros bicornis',
  'Critically Endangered',
  6195,
  'Increasing',
  '+4.0%',
  '{
    "Africa"
  }',
  '{
    "Kenya",
    "South Africa",
    "Namibia",
    "Zimbabwe"
  }',
  'Tropical Savannas & Shrublands',
  'Critical',
  '[{"name":"Poaching for Horns","severity":85},{"name":"Habitat Loss","severity":75},{"name":"Civil Unrest","severity":65},{"name":"Droughts","severity":55}]'::jsonb,
  '[{"year":2016,"population":5548},{"year":2018,"population":5683},{"year":2020,"population":5821},{"year":2022,"population":5923},{"year":2024,"population":6058},{"year":2026,"population":6195}]'::jsonb,
  '[{"year":2028,"population":6313},{"year":2030,"population":6383},{"year":2032,"population":6454},{"year":2035,"population":6635}]'::jsonb,
  '[{"title":"Establish Protected Zones for Poaching for Horns","priority":"HIGH","reason":"Severe threats from Poaching for Horns directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"HIGH","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Civil Unrest via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Save the Rhino International",
    "KWS Kenya",
    "SANParks"
  }',
  '18 August 2026',
  1410,
  'Black rhinos are distinguished by their pointed prehensile upper lip. Severe historical poaching decimated their populations, but anti-poaching patrols and sanctuaries have enabled a slow, steady recovery.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Black_Rhinoceros_in_Ngorongoro.jpg/640px-Black_Rhinoceros_in_Ngorongoro.jpg',
  'Wikimedia Commons',
  'Sajjad F.',
  'CC BY-SA 4.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'white_rhino',
  'White Rhinoceros',
  'Ceratotherium simum',
  'Near Threatened',
  15940,
  'Declining',
  '-3.1%',
  '{
    "Africa"
  }',
  '{
    "South Africa",
    "Kenya",
    "Namibia",
    "Botswana"
  }',
  'Grasslands & Open Savannas',
  'Medium',
  '[{"name":"Poaching","severity":55},{"name":"Habitat Loss","severity":45},{"name":"Droughts","severity":35},{"name":"Small Breeding Pools","severity":25}]'::jsonb,
  '[{"year":2016,"population":18541},{"year":2018,"population":18018},{"year":2020,"population":17423},{"year":2022,"population":16884},{"year":2024,"population":16359},{"year":2026,"population":15940}]'::jsonb,
  '[{"year":2028,"population":15421},{"year":2030,"population":14993},{"year":2032,"population":14681},{"year":2035,"population":14094}]'::jsonb,
  '[{"title":"Establish Protected Zones for Poaching","priority":"MEDIUM","reason":"Severe threats from Poaching directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"MEDIUM","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Droughts via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "IUCN African Rhino Group",
    "WWF South Africa"
  }',
  '18 August 2026',
  2320,
  'The white rhinoceros is the largest species of land mammal after elephants. While the southern subspecies is managed in private reserves, the northern white rhino is functionally extinct with only two females left.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/White_Rhinoceros_Ceratotherium_simum.jpg/640px-White_Rhinoceros_Ceratotherium_simum.jpg',
  'Wikimedia Commons',
  'Charles J. Sharp',
  'CC BY-SA 4.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'forest_elephant',
  'African Forest Elephant',
  'Loxodonta cyclotis',
  'Critically Endangered',
  95000,
  'Declining',
  '-11.2%',
  '{
    "Africa"
  }',
  '{
    "Gabon",
    "Republic of the Congo",
    "Cameroon"
  }',
  'Congolian Tropical Rainforests',
  'Critical',
  '[{"name":"Poaching for Ivory","severity":85},{"name":"Habitat Fragmentation","severity":75},{"name":"Logging","severity":65},{"name":"Human Conflict","severity":55}]'::jsonb,
  '[{"year":2016,"population":110556},{"year":2018,"population":107451},{"year":2020,"population":103990},{"year":2022,"population":100693},{"year":2024,"population":97621},{"year":2026,"population":95000}]'::jsonb,
  '[{"year":2028,"population":92132},{"year":2030,"population":88476},{"year":2032,"population":85548},{"year":2035,"population":82539}]'::jsonb,
  '[{"title":"Establish Protected Zones for Poaching for Ivory","priority":"HIGH","reason":"Severe threats from Poaching for Ivory directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"HIGH","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Logging via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "ANPN Gabon",
    "WCS Central Africa",
    "IUCN Elephant Specialist Group"
  }',
  '18 August 2026',
  1450,
  'African forest elephants reside in the dense rainforests of the Congo Basin. They are smaller than savanna elephants and have straighter tusks. Heavy ivory poaching has reduced their numbers by over 80% in 30 years.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/African_forest_elephant.jpg/640px-African_forest_elephant.jpg',
  'Wikimedia Commons',
  'Thomas Breuer',
  'CC BY-SA 2.5',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'wild_dog',
  'African Wild Dog',
  'Lycaon pictus',
  'Endangered',
  6600,
  'Declining',
  '-5.0%',
  '{
    "Africa"
  }',
  '{
    "Botswana",
    "Zimbabwe",
    "Kenya",
    "Tanzania"
  }',
  'Open Plains & Wooded Savannas',
  'High',
  '[{"name":"Habitat Fragmentation","severity":75},{"name":"Infectious Diseases","severity":65},{"name":"Human Snaring","severity":55},{"name":"Competitor Pressure","severity":45}]'::jsonb,
  '[{"year":2016,"population":7656},{"year":2018,"population":7404},{"year":2020,"population":7146},{"year":2022,"population":6953},{"year":2024,"population":6770},{"year":2026,"population":6600}]'::jsonb,
  '[{"year":2028,"population":6403},{"year":2030,"population":6234},{"year":2032,"population":6098},{"year":2035,"population":5893}]'::jsonb,
  '[{"title":"Establish Protected Zones for Habitat Fragmentation","priority":"HIGH","reason":"Severe threats from Habitat Fragmentation directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"MEDIUM","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Human Snaring via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Painted Dog Conservation",
    "Botswana Predator Conservation"
  }',
  '18 August 2026',
  810,
  'African wild dogs are highly social pack hunters. They are vulnerable to habitat fragmentation, local snaring, and domestic diseases like rabies and distemper contracted from feral dogs.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/African_wild_dog_Lycaon_pictus.jpg/640px-African_wild_dog_Lycaon_pictus.jpg',
  'Wikimedia Commons',
  'Charles J. Sharp',
  'CC BY-SA 4.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'cheetah',
  'Cheetah',
  'Acinonyx jubatus',
  'Vulnerable',
  6517,
  'Declining',
  '-4.6%',
  '{
    "Africa"
  }',
  '{
    "Namibia",
    "Botswana",
    "South Africa",
    "Kenya"
  }',
  'Dry Savannas & Grasslands',
  'Medium',
  '[{"name":"Habitat Encroachment","severity":55},{"name":"Prey Decline","severity":45},{"name":"Pet Trade Illegal Poaching","severity":35},{"name":"Human-Predator Conflict","severity":25}]'::jsonb,
  '[{"year":2016,"population":7679},{"year":2018,"population":7441},{"year":2020,"population":7184},{"year":2022,"population":6960},{"year":2024,"population":6735},{"year":2026,"population":6517}]'::jsonb,
  '[{"year":2028,"population":6304},{"year":2030,"population":6063},{"year":2032,"population":5856},{"year":2035,"population":5662}]'::jsonb,
  '[{"title":"Establish Protected Zones for Habitat Encroachment","priority":"MEDIUM","reason":"Severe threats from Habitat Encroachment directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"MEDIUM","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Pet Trade Illegal Poaching via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Cheetah Conservation Fund",
    "IUCN Cat Specialist Group"
  }',
  '18 August 2026',
  980,
  'The cheetah is the fastest land animal. Cheetahs require vast open ranges, making them highly susceptible to habitat conversion. Fenced farms increase encounters and retaliatory hunting.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Cheetah_Acinonyx_jubatus.jpg/640px-Cheetah_Acinonyx_jubatus.jpg',
  'Wikimedia Commons',
  'Charles J. Sharp',
  'CC BY-SA 4.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'ethiopian_wolf',
  'Ethiopian Wolf',
  'Canis simensis',
  'Endangered',
  500,
  'Declining',
  '-9.4%',
  '{
    "Africa"
  }',
  '{
    "Ethiopia"
  }',
  'Afro-alpine Grasslands',
  'High',
  '[{"name":"Rabies outbreak","severity":75},{"name":"Habitat Loss from Agriculture","severity":65},{"name":"Feral Dog Hybridization","severity":55},{"name":"Overgrazing","severity":45}]'::jsonb,
  '[{"year":2016,"population":576},{"year":2018,"population":561},{"year":2020,"population":546},{"year":2022,"population":527},{"year":2024,"population":513},{"year":2026,"population":500}]'::jsonb,
  '[{"year":2028,"population":482},{"year":2030,"population":466},{"year":2032,"population":455},{"year":2035,"population":445}]'::jsonb,
  '[{"title":"Establish Protected Zones for Rabies outbreak","priority":"HIGH","reason":"Severe threats from Rabies outbreak directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"MEDIUM","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Feral Dog Hybridization via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Ethiopian Wolf Conservation Programme",
    "IUCN Canid Specialist Group"
  }',
  '18 August 2026',
  490,
  'Africa''s rarest canid, the Ethiopian wolf resides in the highlands of Ethiopia. They specialize in hunting rodents but suffer from rabies outbreaks transmitted by domestic dogs.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Ethiopian_wolf_Canis_simensis.jpg/640px-Ethiopian_wolf_Canis_simensis.jpg',
  'Wikimedia Commons',
  'Charles J. Sharp',
  'CC BY-SA 4.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'grevys_zebra',
  'Grevy''s Zebra',
  'Equus grevyi',
  'Endangered',
  2500,
  'Stable',
  '0.0%',
  '{
    "Africa"
  }',
  '{
    "Kenya",
    "Ethiopia"
  }',
  'Semi-arid Grasslands & Bushlands',
  'High',
  '[{"name":"Water Resource Scarcity","severity":75},{"name":"Overgrazing","severity":65},{"name":"Habitat Loss","severity":55},{"name":"Local Hunting","severity":45}]'::jsonb,
  '[{"year":2016,"population":2509},{"year":2018,"population":2508},{"year":2020,"population":2507},{"year":2022,"population":2500},{"year":2024,"population":2506},{"year":2026,"population":2500}]'::jsonb,
  '[{"year":2028,"population":2519},{"year":2030,"population":2504},{"year":2032,"population":2526},{"year":2035,"population":2522}]'::jsonb,
  '[{"title":"Establish Protected Zones for Water Resource Scarcity","priority":"HIGH","reason":"Severe threats from Water Resource Scarcity directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"MEDIUM","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Habitat Loss via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Grevy's Zebra Trust",
    "Kenya Wildlife Service"
  }',
  '18 August 2026',
  610,
  'Grevy''s zebras are larger than plains zebras, featuring narrower stripes. They face water resource competition from livestock and habitat degradation across northern Kenya.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Grevy%27s_Zebra_Equus_grevyi.jpg/640px-Grevy%27s_Zebra_Equus_grevyi.jpg',
  'Wikimedia Commons',
  'Charles J. Sharp',
  'CC BY-SA 4.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'okapi',
  'Okapi',
  'Okapia johnstoni',
  'Endangered',
  15000,
  'Declining',
  '-6.2%',
  '{
    "Africa"
  }',
  '{
    "DR Congo"
  }',
  'Dense Canopy Rainforests',
  'High',
  '[{"name":"Illegal Mining","severity":75},{"name":"Deforestation","severity":65},{"name":"Poaching","severity":55},{"name":"Armed Insurgency","severity":45}]'::jsonb,
  '[{"year":2016,"population":17529},{"year":2018,"population":17039},{"year":2020,"population":16497},{"year":2022,"population":15920},{"year":2024,"population":15429},{"year":2026,"population":15000}]'::jsonb,
  '[{"year":2028,"population":14558},{"year":2030,"population":14013},{"year":2032,"population":13707},{"year":2035,"population":13179}]'::jsonb,
  '[{"title":"Establish Protected Zones for Illegal Mining","priority":"HIGH","reason":"Severe threats from Illegal Mining directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"MEDIUM","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Poaching via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Okapi Conservation Project",
    "WCS Congo",
    "IUCN Red List"
  }',
  '18 August 2026',
  780,
  'The okapi is the only living relative of the giraffe, marked by zebra-like leg stripes. Endemic to the Ituri Rainforest, okapis suffer from forest fragmentation and poaching.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Okapi_in_forest.jpg/640px-Okapi_in_forest.jpg',
  'Wikimedia Commons',
  'Daniel L. Adler',
  'CC BY-SA 4.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'black_footed_cat',
  'Black-footed Cat',
  'Felis nigripes',
  'Vulnerable',
  9700,
  'Declining',
  '-5.1%',
  '{
    "Africa"
  }',
  '{
    "South Africa",
    "Namibia",
    "Botswana"
  }',
  'Dry Open Grasslands & Karoo Savannas',
  'Medium',
  '[{"name":"Poisoning","severity":55},{"name":"Feral Dog Attacks","severity":45},{"name":"Habitat Loss","severity":35},{"name":"Prey Scarcity","severity":25}]'::jsonb,
  '[{"year":2016,"population":11262},{"year":2018,"population":10868},{"year":2020,"population":10595},{"year":2022,"population":10322},{"year":2024,"population":9992},{"year":2026,"population":9700}]'::jsonb,
  '[{"year":2028,"population":9434},{"year":2030,"population":9205},{"year":2032,"population":8933},{"year":2035,"population":8607}]'::jsonb,
  '[{"title":"Establish Protected Zones for Poisoning","priority":"MEDIUM","reason":"Severe threats from Poisoning directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"MEDIUM","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Habitat Loss via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Black-footed Cat Working Group",
    "IUCN Cat Specialist Group"
  }',
  '18 August 2026',
  420,
  'The smallest wild cat in Africa, Black-footed cats are nocturnal and extremely efficient hunters. They are threatened by predator traps and rodent poisons set by livestock farms.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Black-footed_cat_Felis_nigripes.jpg/640px-Black-footed_cat_Felis_nigripes.jpg',
  'Wikimedia Commons',
  'Pierre de Chabannes',
  'CC BY-SA 4.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'addax',
  'Addax',
  'Addax nasomaculatus',
  'Critically Endangered',
  90,
  'Declining',
  '-22.0%',
  '{
    "Africa"
  }',
  '{
    "Niger",
    "Chad"
  }',
  'Sandy & Stony Desert Dunes',
  'Critical',
  '[{"name":"Poaching","severity":85},{"name":"Oil Drilling Disturbance","severity":75},{"name":"Severe Droughts","severity":65},{"name":"Habitat Loss","severity":55}]'::jsonb,
  '[{"year":2016,"population":104},{"year":2018,"population":101},{"year":2020,"population":98},{"year":2022,"population":96},{"year":2024,"population":93},{"year":2026,"population":90}]'::jsonb,
  '[{"year":2028,"population":88},{"year":2030,"population":84},{"year":2032,"population":81},{"year":2035,"population":78}]'::jsonb,
  '[{"title":"Establish Protected Zones for Poaching","priority":"HIGH","reason":"Severe threats from Poaching directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"HIGH","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Severe Droughts via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Sahara Conservation Fund",
    "IUCN Antelope Specialist Group"
  }',
  '18 August 2026',
  150,
  'The addax is a desert antelope with spiral horns. It is highly adapted to extreme Sahara conditions, but unregulated poaching and oil explorations have pushed the wild population close to extinction.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Addax_nasomaculatus_portrait.jpg/640px-Addax_nasomaculatus_portrait.jpg',
  'Wikimedia Commons',
  'Gnu1765',
  'CC BY-SA 3.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'hirola',
  'Hirola',
  'Beatragus hunteri',
  'Critically Endangered',
  500,
  'Declining',
  '-8.0%',
  '{
    "Africa"
  }',
  '{
    "Kenya",
    "Somalia"
  }',
  'Arid Grasslands & Plains',
  'Critical',
  '[{"name":"Livestock Competition","severity":85},{"name":"Disease outbreaks","severity":75},{"name":"Habitat Encroachment","severity":65},{"name":"Droughts","severity":55}]'::jsonb,
  '[{"year":2016,"population":573},{"year":2018,"population":557},{"year":2020,"population":542},{"year":2022,"population":528},{"year":2024,"population":513},{"year":2026,"population":500}]'::jsonb,
  '[{"year":2028,"population":482},{"year":2030,"population":465},{"year":2032,"population":453},{"year":2035,"population":438}]'::jsonb,
  '[{"title":"Establish Protected Zones for Livestock Competition","priority":"HIGH","reason":"Severe threats from Livestock Competition directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"HIGH","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Habitat Encroachment via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Hirola Conservation Programme",
    "KWS Kenya"
  }',
  '18 August 2026',
  290,
  'Often called the four-eyed antelope due to large preorbital glands, hirola are critically endangered. Droughts and intense cattle grazing have heavily degraded their grassland habitats.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Hirola_Beatragus_hunteri.jpg/640px-Hirola_Beatragus_hunteri.jpg',
  'Wikimedia Commons',
  'N. S. Smith',
  'CC BY-SA 4.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'cross_river_gorilla',
  'Cross River Gorilla',
  'Gorilla beringei diehli',
  'Critically Endangered',
  300,
  'Stable',
  '0.0%',
  '{
    "Africa"
  }',
  '{
    "Nigeria",
    "Cameroon"
  }',
  'Montane Rainforests & Bamboo Belts',
  'Critical',
  '[{"name":"Illegal Hunting","severity":85},{"name":"Forest Clearance","severity":75},{"name":"Inbreeding Depression","severity":65},{"name":"Road Building","severity":55}]'::jsonb,
  '[{"year":2016,"population":301},{"year":2018,"population":302},{"year":2020,"population":301},{"year":2022,"population":300},{"year":2024,"population":300},{"year":2026,"population":300}]'::jsonb,
  '[{"year":2028,"population":301},{"year":2030,"population":299},{"year":2032,"population":298},{"year":2035,"population":298}]'::jsonb,
  '[{"title":"Establish Protected Zones for Illegal Hunting","priority":"HIGH","reason":"Severe threats from Illegal Hunting directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"HIGH","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Inbreeding Depression via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "WCS Nigeria",
    "IUCN Great Ape Specialist Group"
  }',
  '18 August 2026',
  210,
  'Residing in forest patches along the Nigeria-Cameroon border, these gorillas are highly wary of humans. Habitat loss and fragmentation restrict contact between sub-groups.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Cross_River_Gorilla_Kamerun.jpg/640px-Cross_River_Gorilla_Kamerun.jpg',
  'Wikimedia Commons',
  'Nick Nichols',
  'Public Domain',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'chimpanzee',
  'Chimpanzee',
  'Pan troglodytes',
  'Endangered',
  250000,
  'Declining',
  '-3.9%',
  '{
    "Africa"
  }',
  '{
    "Uganda",
    "Tanzania",
    "Gabon",
    "Congo"
  }',
  'Tropical Rain Forests & Woodlands',
  'High',
  '[{"name":"Habitat Destruction","severity":75},{"name":"Bushmeat Trade","severity":65},{"name":"Disease Transmission","severity":55},{"name":"Pet Trade Poaching","severity":45}]'::jsonb,
  '[{"year":2016,"population":289023},{"year":2018,"population":279630},{"year":2020,"population":270087},{"year":2022,"population":263328},{"year":2024,"population":256616},{"year":2026,"population":250000}]'::jsonb,
  '[{"year":2028,"population":242316},{"year":2030,"population":233211},{"year":2032,"population":225318},{"year":2035,"population":219603}]'::jsonb,
  '[{"title":"Establish Protected Zones for Habitat Destruction","priority":"HIGH","reason":"Severe threats from Habitat Destruction directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"MEDIUM","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Disease Transmission via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Jane Goodall Institute",
    "IUCN Red List"
  }',
  '18 August 2026',
  1680,
  'Chimpanzees share 98% of human DNA and use complex tools. They are widely distributed but suffer from forest loss, local snare trapping, and human-transmitted viruses.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Chimpanzee_in_forest.jpg/640px-Chimpanzee_in_forest.jpg',
  'Wikimedia Commons',
  'Delphine Bruyere',
  'CC BY-SA 3.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'vaquita',
  'Vaquita',
  'Phocoena sinus',
  'Critically Endangered',
  10,
  'Declining',
  '-28.4%',
  '{
    "North America",
    "Marine"
  }',
  '{
    "Mexico"
  }',
  'Shallow Coastal Waters (Gulf of California)',
  'Critical',
  '[{"name":"Illegal Totoaba Gillnetting","severity":85},{"name":"Bycatch Mortality","severity":75},{"name":"Inbreeding Depression","severity":65},{"name":"Pollution","severity":55}]'::jsonb,
  '[{"year":2016,"population":12},{"year":2018,"population":11},{"year":2020,"population":11},{"year":2022,"population":11},{"year":2024,"population":10},{"year":2026,"population":10}]'::jsonb,
  '[{"year":2028,"population":10},{"year":2030,"population":10},{"year":2032,"population":10},{"year":2035,"population":10}]'::jsonb,
  '[{"title":"Establish Protected Zones for Illegal Totoaba Gillnetting","priority":"HIGH","reason":"Severe threats from Illegal Totoaba Gillnetting directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"HIGH","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Inbreeding Depression via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "CIRVA Vaquita Survey",
    "Sea Shepherd Conservation Society"
  }',
  '18 August 2026',
  180,
  'The vaquita is the world''s smallest and most endangered marine mammal. They are caught accidentally in illegal gillnets set for totoaba fish, driving them to the brink of extinction.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Vaquita_marina_museum.jpg/640px-Vaquita_marina_museum.jpg',
  'Wikimedia Commons',
  'Secretaria de Medio Ambiente',
  'CC BY-SA 4.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'california_condor',
  'California Condor',
  'Gymnogyps californianus',
  'Critically Endangered',
  561,
  'Increasing',
  '+6.1%',
  '{
    "North America"
  }',
  '{
    "United States",
    "Mexico"
  }',
  'Mountain Canyons & Rangelands',
  'Critical',
  '[{"name":"Lead Poisoning from Ammo","severity":85},{"name":"Microtrash Ingestion","severity":75},{"name":"Power Line Collisions","severity":65},{"name":"Avian Influenza","severity":55}]'::jsonb,
  '[{"year":2016,"population":510},{"year":2018,"population":520},{"year":2020,"population":529},{"year":2022,"population":539},{"year":2024,"population":549},{"year":2026,"population":561}]'::jsonb,
  '[{"year":2028,"population":568},{"year":2030,"population":581},{"year":2032,"population":595},{"year":2035,"population":602}]'::jsonb,
  '[{"title":"Establish Protected Zones for Lead Poisoning from Ammo","priority":"HIGH","reason":"Severe threats from Lead Poisoning from Ammo directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"HIGH","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Power Line Collisions via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "US Fish and Wildlife Service",
    "San Diego Zoo Wildlife Alliance"
  }',
  '18 August 2026',
  561,
  'The California condor is the largest North American land bird. Captive breeding programs saved the species from extinction in 1987. Lead poisoning remains their primary threat in the wild.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/California_Condor_flying.jpg/640px-California_Condor_flying.jpg',
  'Wikimedia Commons',
  'Pacific Southwest Region USFWS',
  'CC BY 2.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'jaguar',
  'Jaguar',
  'Panthera onca',
  'Near Threatened',
  173000,
  'Declining',
  '-2.1%',
  '{
    "South America",
    "North America"
  }',
  '{
    "Brazil",
    "Mexico",
    "Colombia",
    "Argentina"
  }',
  'Tropical Rainforests & Wetlands',
  'Medium',
  '[{"name":"Deforestation","severity":55},{"name":"Retaliatory Killing by Ranchers","severity":45},{"name":"Poaching","severity":35},{"name":"Prey Scarcity","severity":25}]'::jsonb,
  '[{"year":2016,"population":203348},{"year":2018,"population":198074},{"year":2020,"population":191472},{"year":2022,"population":185376},{"year":2024,"population":179215},{"year":2026,"population":173000}]'::jsonb,
  '[{"year":2028,"population":169172},{"year":2030,"population":164593},{"year":2032,"population":160610},{"year":2035,"population":156916}]'::jsonb,
  '[{"title":"Establish Protected Zones for Deforestation","priority":"MEDIUM","reason":"Severe threats from Deforestation directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"MEDIUM","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Poaching via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Panthera Jaguar Program",
    "WCS Americas"
  }',
  '18 August 2026',
  1340,
  'Jaguars are the largest big cats in the Americas, with a powerful bite capable of piercing turtle shells. Deforestation of the Amazon and ranch expansions threaten their long-term survival.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Jaguar_Panthera_onca.jpg/640px-Jaguar_Panthera_onca.jpg',
  'Wikimedia Commons',
  'Marcus Obal',
  'CC BY-SA 3.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'giant_otter',
  'Giant Otter',
  'Pteronura brasiliensis',
  'Endangered',
  5000,
  'Declining',
  '-5.8%',
  '{
    "South America"
  }',
  '{
    "Brazil",
    "Peru",
    "Colombia",
    "Guyana"
  }',
  'Rivers, Lakes & Swamps',
  'High',
  '[{"name":"Mercury Pollution","severity":75},{"name":"Habitat Intrusion","severity":65},{"name":"Overfishing","severity":55},{"name":"Ecotourism Stress","severity":45}]'::jsonb,
  '[{"year":2016,"population":5799},{"year":2018,"population":5654},{"year":2020,"population":5487},{"year":2022,"population":5329},{"year":2024,"population":5146},{"year":2026,"population":5000}]'::jsonb,
  '[{"year":2028,"population":4807},{"year":2030,"population":4632},{"year":2032,"population":4534},{"year":2035,"population":4375}]'::jsonb,
  '[{"title":"Establish Protected Zones for Mercury Pollution","priority":"HIGH","reason":"Severe threats from Mercury Pollution directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"MEDIUM","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Overfishing via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Pro-Carnivoros Brazil",
    "IUCN Otter Specialist Group"
  }',
  '18 August 2026',
  620,
  'Giant otters are highly vocal river mammals that live in family groups. Mercury contamination from artisanal gold mining and deforestation are major threats to river systems they inhabit.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Giant_Otter_Pteronura_brasiliensis.jpg/640px-Giant_Otter_Pteronura_brasiliensis.jpg',
  'Wikimedia Commons',
  'Frank Wouters',
  'CC BY 2.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'giant_anteater',
  'Giant Anteater',
  'Myrmecophaga tridactyla',
  'Vulnerable',
  100000,
  'Declining',
  '-4.1%',
  '{
    "South America"
  }',
  '{
    "Brazil",
    "Colombia",
    "Paraguay",
    "Bolivia"
  }',
  'Grasslands & Savannas',
  'Medium',
  '[{"name":"Forest Fires","severity":55},{"name":"Roadkill","severity":45},{"name":"Agricultural Expansion","severity":35},{"name":"Dog Attacks","severity":25}]'::jsonb,
  '[{"year":2016,"population":116394},{"year":2018,"population":112407},{"year":2020,"population":108764},{"year":2022,"population":105568},{"year":2024,"population":102925},{"year":2026,"population":100000}]'::jsonb,
  '[{"year":2028,"population":96413},{"year":2030,"population":93579},{"year":2032,"population":90848},{"year":2035,"population":88219}]'::jsonb,
  '[{"title":"Establish Protected Zones for Forest Fires","priority":"MEDIUM","reason":"Severe threats from Forest Fires directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"MEDIUM","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Agricultural Expansion via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "IUCN Anteater Specialist Group",
    "Pró-Monotremas Brazil"
  }',
  '18 August 2026',
  710,
  'Giant anteaters are specialized insectivores that eat up to 30,000 ants and termites daily. Grassland fires and vehicle collisions are their main threats outside protected areas.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Giant_Anteater_Myrmecophaga_tridactyla.jpg/640px-Giant_Anteater_Myrmecophaga_tridactyla.jpg',
  'Wikimedia Commons',
  'S. Rae',
  'CC BY 2.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'red_wolf',
  'Red Wolf',
  'Canis rufus',
  'Critically Endangered',
  25,
  'Declining',
  '-15.0%',
  '{
    "North America"
  }',
  '{
    "United States"
  }',
  'Pine Forests & Estuarine Wetlands',
  'Critical',
  '[{"name":"Coyote Hybridization","severity":85},{"name":"Vehicle Collisions","severity":75},{"name":"Illegal Shooting","severity":65},{"name":"Small Population Size","severity":55}]'::jsonb,
  '[{"year":2016,"population":29},{"year":2018,"population":28},{"year":2020,"population":27},{"year":2022,"population":26},{"year":2024,"population":26},{"year":2026,"population":25}]'::jsonb,
  '[{"year":2028,"population":24},{"year":2030,"population":23},{"year":2032,"population":22},{"year":2035,"population":22}]'::jsonb,
  '[{"title":"Establish Protected Zones for Coyote Hybridization","priority":"HIGH","reason":"Severe threats from Coyote Hybridization directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"HIGH","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Illegal Shooting via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "US Fish and Wildlife Service Red Wolf Recovery",
    "Red Wolf Coalition"
  }',
  '18 August 2026',
  190,
  'The red wolf is native to the southeastern US. Decimated by predator control programs, only a tiny reintroduced population remains in North Carolina, threatened by interbreeding with coyotes.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Red_Wolf_Canis_rufus.jpg/640px-Red_Wolf_Canis_rufus.jpg',
  'Wikimedia Commons',
  'Rebecca Bose',
  'CC BY-SA 3.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'black_footed_ferret',
  'Black-footed Ferret',
  'Mustela nigripes',
  'Endangered',
  350,
  'Stable',
  '0.0%',
  '{
    "North America"
  }',
  '{
    "United States",
    "Canada"
  }',
  'Shortgrass Prairies',
  'High',
  '[{"name":"Sylvatic Plague","severity":75},{"name":"Prairie Dog Decline","severity":65},{"name":"Inbreeding Depression","severity":55},{"name":"Habitat Loss","severity":45}]'::jsonb,
  '[{"year":2016,"population":354},{"year":2018,"population":352},{"year":2020,"population":353},{"year":2022,"population":351},{"year":2024,"population":350},{"year":2026,"population":350}]'::jsonb,
  '[{"year":2028,"population":352},{"year":2030,"population":354},{"year":2032,"population":353},{"year":2035,"population":353}]'::jsonb,
  '[{"title":"Establish Protected Zones for Sylvatic Plague","priority":"HIGH","reason":"Severe threats from Sylvatic Plague directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"MEDIUM","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Inbreeding Depression via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "National Black-footed Ferret Conservation Center",
    "IUCN Red List"
  }',
  '18 August 2026',
  460,
  'The black-footed ferret is a nocturnal carnivore dependent on prairie dogs for food and shelter. They were saved from extinction through captive breeding, but plague outbreaks remain a concern.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Black-footed_Ferret.jpg/640px-Black-footed_Ferret.jpg',
  'Wikimedia Commons',
  'USFWS Mountain-Prairie',
  'Public Domain',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'andean_bear',
  'Andean Bear',
  'Tremarctos ornatus',
  'Vulnerable',
  10000,
  'Declining',
  '-3.8%',
  '{
    "South America"
  }',
  '{
    "Peru",
    "Ecuador",
    "Colombia",
    "Bolivia"
  }',
  'High-Altitude Cloud Forests',
  'Medium',
  '[{"name":"Habitat Destruction","severity":55},{"name":"Agricultural Encroachment","severity":45},{"name":"Retaliatory Killing","severity":35},{"name":"Hunting","severity":25}]'::jsonb,
  '[{"year":2016,"population":11671},{"year":2018,"population":11320},{"year":2020,"population":11034},{"year":2022,"population":10665},{"year":2024,"population":10310},{"year":2026,"population":10000}]'::jsonb,
  '[{"year":2028,"population":9611},{"year":2030,"population":9373},{"year":2032,"population":9044},{"year":2035,"population":8762}]'::jsonb,
  '[{"title":"Establish Protected Zones for Habitat Destruction","priority":"MEDIUM","reason":"Severe threats from Habitat Destruction directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"MEDIUM","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Retaliatory Killing via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Spectacled Bear Conservation Peru",
    "IUCN Bear Specialist Group"
  }',
  '18 August 2026',
  630,
  'Also called the spectacled bear, this is the only bear species native to South America. Expanding cloud-forest agriculture fragments their habitats and causes conflict with local farms.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Andean_Bear_Spectacled.jpg/640px-Andean_Bear_Spectacled.jpg',
  'Wikimedia Commons',
  'Pauline R.',
  'CC BY-SA 4.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'turtle',
  'Hawksbill Turtle',
  'Eretmochelys imbricata',
  'Critically Endangered',
  8000,
  'Declining',
  '-8.4%',
  '{
    "North America",
    "South America",
    "Asia",
    "Marine"
  }',
  '{
    "Mexico",
    "Brazil",
    "Indonesia",
    "Australia"
  }',
  'Coral Reefs & Shallow Estuaries',
  'Critical',
  '[{"name":"Tortoiseshell Harvesting","severity":85},{"name":"Reef Degradation","severity":75},{"name":"Egg Poaching","severity":65},{"name":"Plastic Pollution","severity":55}]'::jsonb,
  '[{"year":2016,"population":9223},{"year":2018,"population":8962},{"year":2020,"population":8714},{"year":2022,"population":8456},{"year":2024,"population":8233},{"year":2026,"population":8000}]'::jsonb,
  '[{"year":2028,"population":7766},{"year":2030,"population":7472},{"year":2032,"population":7267},{"year":2035,"population":7069}]'::jsonb,
  '[{"title":"Establish Protected Zones for Tortoiseshell Harvesting","priority":"HIGH","reason":"Severe threats from Tortoiseshell Harvesting directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"HIGH","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Egg Poaching via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "NOAA Fisheries Marine Turtles",
    "Sea Turtle Conservancy"
  }',
  '18 August 2026',
  1540,
  'Hawksbill turtles are tropical reef dwellers that feed primarily on sponges. They are critically threatened by poaching for their translucent shells, which are used to make ornaments.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Hawksbill_Turtle_Eretmochelys_imbricata.jpg/640px-Hawksbill_Turtle_Eretmochelys_imbricata.jpg',
  'Wikimedia Commons',
  'Caroline Rogers',
  'Public Domain',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'leatherback_turtle',
  'Leatherback Turtle',
  'Dermochelys coriacea',
  'Vulnerable',
  30000,
  'Declining',
  '-7.0%',
  '{
    "North America",
    "South America",
    "Africa",
    "Marine"
  }',
  '{
    "United States",
    "Costa Rica",
    "Gabon",
    "Trinidad and Tobago"
  }',
  'Open Ocean & Coastal Nesting Beaches',
  'High',
  '[{"name":"Bycatch","severity":75},{"name":"Plastic Debris Ingestion","severity":65},{"name":"Egg Poaching","severity":55},{"name":"Coastal Development","severity":45}]'::jsonb,
  '[{"year":2016,"population":34907},{"year":2018,"population":33965},{"year":2020,"population":32821},{"year":2022,"population":31940},{"year":2024,"population":30901},{"year":2026,"population":30000}]'::jsonb,
  '[{"year":2028,"population":28919},{"year":2030,"population":28044},{"year":2032,"population":27062},{"year":2035,"population":26044}]'::jsonb,
  '[{"title":"Establish Protected Zones for Bycatch","priority":"HIGH","reason":"Severe threats from Bycatch directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"MEDIUM","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Egg Poaching via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Wider Caribbean Sea Turtle Network",
    "NOAA Fisheries"
  }',
  '18 August 2026',
  1210,
  'The leatherback is the largest living sea turtle, unique for its leathery carapace instead of a bony shell. Marine plastic pollution and egg poaching at nesting sites are their main threats.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Leatherback_sea_turtle.jpg/640px-Leatherback_sea_turtle.jpg',
  'Wikimedia Commons',
  'U.S. Fish and Wildlife Service',
  'Public Domain',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'iberian_lynx',
  'Iberian Lynx',
  'Lynx pardinus',
  'Endangered',
  1668,
  'Increasing',
  '+14.2%',
  '{
    "Europe"
  }',
  '{
    "Spain",
    "Portugal"
  }',
  'Mediterranean Scrublands',
  'High',
  '[{"name":"Rabbit Population Declines","severity":75},{"name":"Vehicle Collisions","severity":65},{"name":"Illegal Trapping","severity":55},{"name":"Genetic Bottlenecks","severity":45}]'::jsonb,
  '[{"year":2016,"population":1518},{"year":2018,"population":1545},{"year":2020,"population":1574},{"year":2022,"population":1611},{"year":2024,"population":1642},{"year":2026,"population":1668}]'::jsonb,
  '[{"year":2028,"population":1708},{"year":2030,"population":1734},{"year":2032,"population":1764},{"year":2035,"population":1816}]'::jsonb,
  '[{"title":"Establish Protected Zones for Rabbit Population Declines","priority":"HIGH","reason":"Severe threats from Rabbit Population Declines directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"MEDIUM","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Illegal Trapping via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Life+ Lince Ibérico Project",
    "IUCN Cat Specialist Group"
  }',
  '18 August 2026',
  1668,
  'The Iberian lynx is native to southwestern Europe. Severe declines in wild rabbit populations (their primary prey) almost caused their extinction, but intensive recovery efforts have boosted their numbers.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Iberian_Lynx_Lynx_pardinus.jpg/640px-Iberian_Lynx_Lynx_pardinus.jpg',
  'Wikimedia Commons',
  'Programa Ex-situ Lince Ibérico',
  'CC BY-SA 3.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'european_mink',
  'European Mink',
  'Mustela lutreola',
  'Critically Endangered',
  5000,
  'Declining',
  '-9.2%',
  '{
    "Europe"
  }',
  '{
    "Spain",
    "France",
    "Estonia",
    "Romania"
  }',
  'Freshwater Streams & Marshlands',
  'Critical',
  '[{"name":"American Mink Competition","severity":85},{"name":"Habitat Loss","severity":75},{"name":"Water Pollution","severity":65},{"name":"Drowning in Fish Traps","severity":55}]'::jsonb,
  '[{"year":2016,"population":5804},{"year":2018,"population":5639},{"year":2020,"population":5493},{"year":2022,"population":5332},{"year":2024,"population":5154},{"year":2026,"population":5000}]'::jsonb,
  '[{"year":2028,"population":4802},{"year":2030,"population":4629},{"year":2032,"population":4472},{"year":2035,"population":4320}]'::jsonb,
  '[{"title":"Establish Protected Zones for American Mink Competition","priority":"HIGH","reason":"Severe threats from American Mink Competition directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"HIGH","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Water Pollution via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Lutra Foundation Estonia",
    "EuroMink Project"
  }',
  '18 August 2026',
  410,
  'European minks are semi-aquatic weasels native to European wetlands. They face critical competition from introduced invasive American minks, which outcompete them for territory.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/European_Mink_Mustela_lutreola.jpg/640px-European_Mink_Mustela_lutreola.jpg',
  'Wikimedia Commons',
  'Tiit Maran',
  'CC BY-SA 3.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'polar_bear',
  'Polar Bear',
  'Ursus maritimus',
  'Vulnerable',
  26000,
  'Declining',
  '-5.0%',
  '{
    "Arctic",
    "Marine"
  }',
  '{
    "Canada",
    "United States",
    "Russia",
    "Norway",
    "Greenland"
  }',
  'Arctic Sea Ice & Coastal Plains',
  'High',
  '[{"name":"Sea Ice Retreat","severity":75},{"name":"Industrial Disturbances","severity":65},{"name":"Overharvesting","severity":55},{"name":"Bioaccumulating Pollutants","severity":45}]'::jsonb,
  '[{"year":2016,"population":30011},{"year":2018,"population":29189},{"year":2020,"population":28208},{"year":2022,"population":27415},{"year":2024,"population":26668},{"year":2026,"population":26000}]'::jsonb,
  '[{"year":2028,"population":25025},{"year":2030,"population":24134},{"year":2032,"population":23510},{"year":2035,"population":22791}]'::jsonb,
  '[{"title":"Establish Protected Zones for Sea Ice Retreat","priority":"HIGH","reason":"Severe threats from Sea Ice Retreat directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"MEDIUM","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Overharvesting via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Polar Bears International",
    "USGS Arctic Studies"
  }',
  '18 August 2026',
  1890,
  'Polar bears depend entirely on sea ice to hunt seals. Global warming is melting ice sheets early in summer, reducing their hunting windows and leading to starvation across core ranges.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Polar_Bear_Ursus_maritimus.jpg/640px-Polar_Bear_Ursus_maritimus.jpg',
  'Wikimedia Commons',
  'Alan Wilson',
  'CC BY-SA 3.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'saiga_antelope',
  'Saiga Antelope',
  'Saiga tatarica',
  'Near Threatened',
  1900000,
  'Increasing',
  '+22.4%',
  '{
    "Europe",
    "Asia"
  }',
  '{
    "Kazakhstan",
    "Mongolia",
    "Russia"
  }',
  'Arid Steppes & Grasslands',
  'Medium',
  '[{"name":"Mass Mortality Disease","severity":55},{"name":"Illegal Horn Trade","severity":45},{"name":"Harsh Winters","severity":35},{"name":"Fences Block Migrations","severity":25}]'::jsonb,
  '[{"year":2016,"population":1727475},{"year":2018,"population":1758025},{"year":2020,"population":1789135},{"year":2022,"population":1827412},{"year":2024,"population":1870864},{"year":2026,"population":1900000}]'::jsonb,
  '[{"year":2028,"population":1950314},{"year":2030,"population":1977476},{"year":2032,"population":2033232},{"year":2035,"population":2091424}]'::jsonb,
  '[{"title":"Establish Protected Zones for Mass Mortality Disease","priority":"MEDIUM","reason":"Severe threats from Mass Mortality Disease directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"MEDIUM","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Harsh Winters via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Saiga Conservation Alliance",
    "ACBK Kazakhstan"
  }',
  '18 August 2026',
  1420,
  'Known for its large bulbous snout, the saiga antelope lives in dry steppes. Severe disease events previously wiped out entire herds, but strong protection programs have driven a massive recovery in Kazakhstan.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Saiga_Antelope_Kazakhstan.jpg/640px-Saiga_Antelope_Kazakhstan.jpg',
  'Wikimedia Commons',
  'Navinder Singh',
  'CC BY-SA 4.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'atlantic_puffin',
  'Atlantic Puffin',
  'Fratercula arctica',
  'Vulnerable',
  12000000,
  'Declining',
  '-6.3%',
  '{
    "Europe",
    "North America",
    "Marine"
  }',
  '{
    "Iceland",
    "Norway",
    "United Kingdom",
    "Canada"
  }',
  'Coastal Cliffs & Open Sea',
  'Medium',
  '[{"name":"Overfishing of Sandeels","severity":55},{"name":"Marine Temperature Rises","severity":45},{"name":"Oil Spills","severity":35},{"name":"Introduced Predators","severity":25}]'::jsonb,
  '[{"year":2016,"population":14038811},{"year":2018,"population":13680178},{"year":2020,"population":13254032},{"year":2022,"population":12845587},{"year":2024,"population":12405340},{"year":2026,"population":12000000}]'::jsonb,
  '[{"year":2028,"population":11584289},{"year":2030,"population":11255432},{"year":2032,"population":11023351},{"year":2035,"population":10587405}]'::jsonb,
  '[{"title":"Establish Protected Zones for Overfishing of Sandeels","priority":"MEDIUM","reason":"Severe threats from Overfishing of Sandeels directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"MEDIUM","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Oil Spills via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Icelandic Institute of Natural History",
    "RSPB UK"
  }',
  '18 August 2026',
  1350,
  'Atlantic puffins nest in clifftop burrows. Warming oceans have shifted sandeel migrations, their primary food source, causing severe breeding failures and chick starvation across North Atlantic colonies.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Atlantic_Puffin_Fratercula_arctica.jpg/640px-Atlantic_Puffin_Fratercula_arctica.jpg',
  'Wikimedia Commons',
  'Richard Bartz',
  'CC BY-SA 2.5',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'tasmanian_devil',
  'Tasmanian Devil',
  'Sarcophilus harrisii',
  'Endangered',
  17000,
  'Declining',
  '-6.8%',
  '{
    "Australia & Oceania"
  }',
  '{
    "Australia"
  }',
  'Dry Eucalypt Forests & Coastal Woodlands',
  'High',
  '[{"name":"Devil Facial Tumor Disease","severity":75},{"name":"Vehicle Collisions","severity":65},{"name":"Feral Dog Attacks","severity":55},{"name":"Habitat Loss","severity":45}]'::jsonb,
  '[{"year":2016,"population":19925},{"year":2018,"population":19242},{"year":2020,"population":18590},{"year":2022,"population":18046},{"year":2024,"population":17521},{"year":2026,"population":17000}]'::jsonb,
  '[{"year":2028,"population":16649},{"year":2030,"population":16263},{"year":2032,"population":15790},{"year":2035,"population":15340}]'::jsonb,
  '[{"title":"Establish Protected Zones for Devil Facial Tumor Disease","priority":"HIGH","reason":"Severe threats from Devil Facial Tumor Disease directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"MEDIUM","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Feral Dog Attacks via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Save the Tasmanian Devil Program",
    "IUCN Red List"
  }',
  '18 August 2026',
  1120,
  'The Tasmanian devil is the largest carnivorous marsupial. They suffer from a contagious transmissible cancer called Devil Facial Tumor Disease (DFTD), which has decimated wild populations since 1996.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Tasmanian_devil_Sarcophilus_harrisii.jpg/640px-Tasmanian_devil_Sarcophilus_harrisii.jpg',
  'Wikimedia Commons',
  'Wayne McLean',
  'CC BY-SA 2.5',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'numbat',
  'Numbat',
  'Myrmecobius fasciatus',
  'Endangered',
  1000,
  'Stable',
  '0.0%',
  '{
    "Australia & Oceania"
  }',
  '{
    "Australia"
  }',
  'Dry Eucalypt Woodlands',
  'High',
  '[{"name":"Feral Cat Predation","severity":75},{"name":"Red Fox Predation","severity":65},{"name":"Bushfires","severity":55},{"name":"Habitat Loss","severity":45}]'::jsonb,
  '[{"year":2016,"population":993},{"year":2018,"population":990},{"year":2020,"population":994},{"year":2022,"population":996},{"year":2024,"population":998},{"year":2026,"population":1000}]'::jsonb,
  '[{"year":2028,"population":1008},{"year":2030,"population":1013},{"year":2032,"population":1014},{"year":2035,"population":1018}]'::jsonb,
  '[{"title":"Establish Protected Zones for Feral Cat Predation","priority":"HIGH","reason":"Severe threats from Feral Cat Predation directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"MEDIUM","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Bushfires via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Project Numbat",
    "Perth Zoo Conservation Department"
  }',
  '18 August 2026',
  430,
  'Numbats are small termite-eating marsupials that are active during the day. Introduced foxes and feral cats are the main causes of their decline, requiring predator-free fenced reserves for survival.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Numbat_Myrmecobius_fasciatus.jpg/640px-Numbat_Myrmecobius_fasciatus.jpg',
  'Wikimedia Commons',
  'Martin Pot',
  'CC BY-SA 3.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'kakapo',
  'Kakapo',
  'Strigops habroptilus',
  'Critically Endangered',
  247,
  'Increasing',
  '+11.5%',
  '{
    "Australia & Oceania"
  }',
  '{
    "New Zealand"
  }',
  'Tussock Grasslands & Podocarp Forests',
  'Critical',
  '[{"name":"Inbreeding Depression","severity":85},{"name":"Feral Predators","severity":75},{"name":"Aspergillosis Outbreaks","severity":65},{"name":"Poor Nesting Years","severity":55}]'::jsonb,
  '[{"year":2016,"population":225},{"year":2018,"population":230},{"year":2020,"population":235},{"year":2022,"population":239},{"year":2024,"population":243},{"year":2026,"population":247}]'::jsonb,
  '[{"year":2028,"population":253},{"year":2030,"population":259},{"year":2032,"population":263},{"year":2035,"population":268}]'::jsonb,
  '[{"title":"Establish Protected Zones for Inbreeding Depression","priority":"HIGH","reason":"Severe threats from Inbreeding Depression directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"HIGH","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Aspergillosis Outbreaks via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Kākāpō Recovery NZ",
    "DOC New Zealand"
  }',
  '18 August 2026',
  247,
  'The kakapo is a large, flightless, nocturnal parrot native to New Zealand. They survive exclusively on predator-free sanctuary islands where intensive hand-rearing and genetic management are performed.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Kakapo_Sirocco.jpg/640px-Kakapo_Sirocco.jpg',
  'Wikimedia Commons',
  'Department of Conservation NZ',
  'CC BY 2.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'kiwi',
  'Little Spotted Kiwi',
  'Apteryx owenii',
  'Vulnerable',
  1400,
  'Increasing',
  '+4.2%',
  '{
    "Australia & Oceania"
  }',
  '{
    "New Zealand"
  }',
  'Temperate Evergreen Forests & Shrubs',
  'Medium',
  '[{"name":"Feral Stoats & Cats","severity":55},{"name":"Introduced Weasels","severity":45},{"name":"Small Sanctuary Capacity","severity":35},{"name":"Forest Clearing","severity":25}]'::jsonb,
  '[{"year":2016,"population":1277},{"year":2018,"population":1301},{"year":2020,"population":1324},{"year":2022,"population":1350},{"year":2024,"population":1370},{"year":2026,"population":1400}]'::jsonb,
  '[{"year":2028,"population":1419},{"year":2030,"population":1451},{"year":2032,"population":1480},{"year":2035,"population":1501}]'::jsonb,
  '[{"title":"Establish Protected Zones for Feral Stoats & Cats","priority":"MEDIUM","reason":"Severe threats from Feral Stoats & Cats directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"MEDIUM","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Small Sanctuary Capacity via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Kiwi Recovery Group",
    "DOC New Zealand"
  }',
  '18 August 2026',
  490,
  'The smallest kiwi species, Little Spotted Kiwis are flightless and feed on soil invertebrates. Reintroduction to predator-free islands has successfully stabilized their numbers.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Little_spotted_kiwi.jpg/640px-Little_spotted_kiwi.jpg',
  'Wikimedia Commons',
  'DOC New Zealand',
  'CC BY 2.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'leadbeaters_possum',
  'Leadbeater''s Possum',
  'Gymnobelideus leadbeateri',
  'Critically Endangered',
  2500,
  'Declining',
  '-9.0%',
  '{
    "Australia & Oceania"
  }',
  '{
    "Australia"
  }',
  'Mountain Ash Wet Sclerophyll Forests',
  'Critical',
  '[{"name":"Logging","severity":85},{"name":"Severe Bushfires","severity":75},{"name":"Loss of Old Hollow Trees","severity":65},{"name":"Habitat Fragmentation","severity":55}]'::jsonb,
  '[{"year":2016,"population":2920},{"year":2018,"population":2829},{"year":2020,"population":2749},{"year":2022,"population":2655},{"year":2024,"population":2588},{"year":2026,"population":2500}]'::jsonb,
  '[{"year":2028,"population":2443},{"year":2030,"population":2388},{"year":2032,"population":2310},{"year":2035,"population":2251}]'::jsonb,
  '[{"title":"Establish Protected Zones for Logging","priority":"HIGH","reason":"Severe threats from Logging directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"HIGH","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Loss of Old Hollow Trees via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Friends of Leadbeater's Possum",
    "Victoria Department of Environment"
  }',
  '18 August 2026',
  390,
  'Also called the Fairy Possum, this small marsupial is restricted to the Central Highlands of Victoria. They depend on hollows in mature mountain ash trees, which are lost to logging and forest fires.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Leadbeaters_possum.jpg/640px-Leadbeaters_possum.jpg',
  'Wikimedia Commons',
  'Harriet Spark',
  'CC BY-SA 4.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'wombat',
  'Northern Hairy-nosed Wombat',
  'Lasiorhinus krefftii',
  'Critically Endangered',
  315,
  'Increasing',
  '+8.2%',
  '{
    "Australia & Oceania"
  }',
  '{
    "Australia"
  }',
  'Sandy Eucalypt Woodlands',
  'Critical',
  '[{"name":"Predation by Wild Dogs","severity":85},{"name":"Grassland Degradation","severity":75},{"name":"Small Breeding Range","severity":65},{"name":"Disease","severity":55}]'::jsonb,
  '[{"year":2016,"population":290},{"year":2018,"population":295},{"year":2020,"population":299},{"year":2022,"population":304},{"year":2024,"population":310},{"year":2026,"population":315}]'::jsonb,
  '[{"year":2028,"population":324},{"year":2030,"population":330},{"year":2032,"population":338},{"year":2035,"population":346}]'::jsonb,
  '[{"title":"Establish Protected Zones for Predation by Wild Dogs","priority":"HIGH","reason":"Severe threats from Predation by Wild Dogs directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"HIGH","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Small Breeding Range via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "The Wombat Foundation",
    "Queensland DES"
  }',
  '18 August 2026',
  315,
  'This is one of the rarest land mammals in the world. They survive in only two small reserves in Queensland, protected by wild-dog exclusion fences. Reintroductions have helped their numbers recover.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Lasiorhinus_krefftii.jpg/640px-Lasiorhinus_krefftii.jpg',
  'Wikimedia Commons',
  'Queensland Dept of Environment',
  'CC BY 4.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;

INSERT INTO species_data (
  id, common_name, scientific_name, status, current_population, trend, population_change,
  region, countries, habitat, threat_level, threats, population_history, predicted_population,
  recommendations, data_sources, last_updated, records_used, description, image,
  image_source, image_author, image_license, is_published
) VALUES (
  'dugong',
  'Dugong',
  'Dugong dugon',
  'Vulnerable',
  100000,
  'Declining',
  '-4.8%',
  '{
    "Australia & Oceania",
    "Asia",
    "Marine"
  }',
  '{
    "Australia",
    "Indonesia",
    "Philippines",
    "Egypt"
  }',
  'Shallow Seagrass Meadows',
  'Medium',
  '[{"name":"Seagrass Degradation","severity":55},{"name":"Net Entanglement","severity":45},{"name":"Boat Strikes","severity":35},{"name":"Coastal Developments","severity":25}]'::jsonb,
  '[{"year":2016,"population":116036},{"year":2018,"population":112361},{"year":2020,"population":108804},{"year":2022,"population":105802},{"year":2024,"population":103041},{"year":2026,"population":100000}]'::jsonb,
  '[{"year":2028,"population":97978},{"year":2030,"population":94219},{"year":2032,"population":91862},{"year":2035,"population":89561}]'::jsonb,
  '[{"title":"Establish Protected Zones for Seagrass Degradation","priority":"MEDIUM","reason":"Severe threats from Seagrass Degradation directly impact long-term population density.","supportingData":"Assessed risk indicator registers critical baseline levels"},{"title":"Implement Smart Anti-Poaching Patrols","priority":"MEDIUM","reason":"Ranger telemetry indicates poaching pressure in critical wildlife boundaries.","supportingData":"Field checkpoints report snaring frequency spikes"},{"title":"Reduce Boat Strikes via Community Buffers","priority":"LOW","reason":"Coexistence strategies minimize human encroachment and mitigate land conflicts.","supportingData":"Community awareness registers high engagement levels"}]'::jsonb,
  '{
    "Great Barrier Reef Marine Park Authority",
    "IUCN Dugong Specialist Group"
  }',
  '18 August 2026',
  1850,
  'Dugongs are marine herbivores that feed exclusively on seagrass. Coastal runoff and agricultural discharge degrade seagrass meadows, depriving them of forage and driving local declines.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Dugong_underwater.jpg/640px-Dugong_underwater.jpg',
  'Wikimedia Commons',
  'Julien Willem',
  'CC BY-SA 3.0',
  true
) ON CONFLICT (id) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  status = EXCLUDED.status,
  current_population = EXCLUDED.current_population,
  trend = EXCLUDED.trend,
  population_change = EXCLUDED.population_change,
  region = EXCLUDED.region,
  countries = EXCLUDED.countries,
  habitat = EXCLUDED.habitat,
  threat_level = EXCLUDED.threat_level,
  threats = EXCLUDED.threats,
  population_history = EXCLUDED.population_history,
  predicted_population = EXCLUDED.predicted_population,
  recommendations = EXCLUDED.recommendations,
  data_sources = EXCLUDED.data_sources,
  last_updated = EXCLUDED.last_updated,
  records_used = EXCLUDED.records_used,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  image_source = EXCLUDED.image_source,
  image_author = EXCLUDED.image_author,
  image_license = EXCLUDED.image_license,
  is_published = EXCLUDED.is_published;
