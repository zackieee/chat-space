class Message < ApplicationRecord
  validates :body, presence: true , if: -> { image.blank? }

  belongs_to :group
  belongs_to :user

  mount_uploader :image, ImageUploader

end