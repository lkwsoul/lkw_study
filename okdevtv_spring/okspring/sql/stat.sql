select judgement, count(*) count
from javatest.game
group by judgement;


ALTER TABLE javatest.game convert to charset utf8;


delete from javatest.game;