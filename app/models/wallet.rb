class Wallet < ApplicationRecord
  belongs_to :user

  def balance
    `spl-token balance --owner #{wallet_id} 7aKNMEvezpGe2NuqRJKU3c59DGAC2fydCtKjmaHtdQ4o`.presence&.to_i || 0
  end
end
