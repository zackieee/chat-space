# README

テスト的な変更です。

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* Database deisgn

## usersテーブル

|Column   |Type   |Options                  |
|---------|-------|-------------------------|
|name     |string |null: false,index: true  |
|password |string |null: false              |
|email    |string |null: false,unique: true |

### Association
- has_many  :groups,  through: :members
- has_many  :messages
- has_many  :members

## groupsテーブル

|Column     |Type   |Options    |
|-----------|-------|-----------|
|group_name |string |null: false|

### Association
- has_many  :users, through: :members
- has_many  :messages
- has_many  :members

## membersテーブル

|Column   |Type       |Options                        |
|---------|-----------|-------------------------------|
|user_id  |references |null: false, foreign_key: true |
|group_id |references |null: false, foreign_key: true |

### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル

|Column   |Type       |Options                        |
|---------|-----------|-------------------------------|
|body     |text       |                               |
|image    |string     |                               |
|group_id |references |null: false, foreign_key: true |
|user_id  |references |null: false, foreign_key: true |

### Association
- belongs_to :group
- belongs_to :user

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
