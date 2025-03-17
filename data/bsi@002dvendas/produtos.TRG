TYPE=TRIGGERS
triggers='CREATE DEFINER=`root`@`%` TRIGGER calcular_total_insert\nBEFORE INSERT ON produtos\nFOR EACH ROW\nSET NEW.total = NEW.quantidade * NEW.valor' 'CREATE DEFINER=`root`@`%` TRIGGER calcular_total_update\nBEFORE UPDATE ON produtos\nFOR EACH ROW\nSET NEW.total = NEW.quantidade * NEW.valor'
sql_modes=1411383296 1411383296
definers='root@%' 'root@%'
client_cs_names='utf8mb4' 'utf8mb4'
connection_cl_names='utf8mb4_unicode_ci' 'utf8mb4_unicode_ci'
db_cl_names='latin1_swedish_ci' 'latin1_swedish_ci'
created=1742174383772350 1742174405800981
