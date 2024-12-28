INSERT INTO 'PhotoAnalisys' (idReport, name, url) VALUES (1, 'Foto 02', 'https://picsum.photos/700/400?random');

insert into 
  "PhotoAnalisys" (
    id, 
    "idReport", 
    url, 
    name
  )
values
  (
    $id, 
    $idReport, 
    $url, 
    $name
  );