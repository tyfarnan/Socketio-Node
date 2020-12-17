SELECT count(DISTINCT(p.id)) 
FROM patient p 
JOIN observation o ON o.resource#>>'{subject,id}' = p.id
WHERE (o.resource @> '{"code": {"coding": [{"code": "72166-2"}]}}'::jsonb) -- LOINC: Smoking status
  AND ((o.resource @> '{"value": {"CodeableConcept": { "coding": [{"code": "449868002"}]}}}') -- SNOMED: Current every day smoker
       OR (o.resource @> '{"value": {"CodeableConcept": { "coding": [{"code": "8517006"}]}}}')) -- SNOMED: Former smoker
  AND (extract(year from age(now(), (p.resource->>'birthDate')::date)) > 45) -- patient's age > 45
  AND (p.resource->>'gender' = 'male'); -- patient gender is male 