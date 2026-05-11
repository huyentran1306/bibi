-- bibi database schema
-- Tables: bibi_rsvp, bibi_messages

CREATE TABLE IF NOT EXISTS bibi_rsvp (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT    NOT NULL,
  note       TEXT    NOT NULL DEFAULT '',
  status     TEXT    NOT NULL DEFAULT 'yes', -- 'yes' | 'maybe' | 'no'
  created_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000)
);

CREATE TABLE IF NOT EXISTS bibi_messages (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT    NOT NULL,
  note       TEXT    NOT NULL,
  color      TEXT    NOT NULL DEFAULT 'pink',
  created_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000)
);

-- Seed: default messages from friends
INSERT INTO bibi_messages (name, note, color) VALUES
  ('Mai',   'Bi ơi, chúc mừng nhaa! Cảm ơn vì mọi lần học chung tới 3 giờ sáng, mọi cái ôm trước buổi thuyết trình. Yêu cậu lắm luôn 💖', 'pink'),
  ('Linh',  'Mình đã làm được rồi nè 🥹 Bốn năm trôi qua nhanh thật — cứ giữ năng lượng rực rỡ, mạnh mẽ, chiến deadline như xưa nha bạn.', 'lav'),
  ('An',    'Từ năm 1 đến giờ, em vẫn nhớ lần chị giúp em qua môn Kinh tế vĩ mô. Mãi biết ơn chị nhiều lắm 💌', 'blue'),
  ('Hà',    'Cảm ơn vì đã là đồng đội của tớ trong MỌI bài tập nhóm. Sau này ai sẽ nghe tớ than Excel đây trời ơi 😭', 'cream'),
  ('Khoa',  'Chúc mừng Bibi nhaa! Đường rộng mở phía trước, mong cậu mãi giữ được nụ cười rạng rỡ như hôm tốt nghiệp 🌷', 'mint'),
  ('Trinh', 'Cậu chính là lý do tớ qua được môn Thống kê. Bạn thân đỉnh nhất quả đất. Giờ thì ra chinh phục thế giới ngân hàng đi 💼✨', 'pink');
