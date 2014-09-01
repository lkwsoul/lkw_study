select * from game order by id desc;


    SELECT
    choice,
    computerChoice,
    judgement,
    datetime
      FROM game
     WHERE judgement like '%' || '컴퓨터' || '%' limit 1
     ;