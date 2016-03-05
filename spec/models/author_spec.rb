require 'spec_helper'

RSpec.describe Author, :type => :model do
  it "must have a username" do
    expect(FactoryGirl.build(:author, username: nil)).not_to be_valid
  end
end
