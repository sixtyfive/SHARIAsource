class SearchFilters
  include ActiveAttr::Model

  attribute :q
  attribute :date_from
  attribute :date_to
  attribute :date_format, default: 'ce'
  attribute :language
  attribute :contributor
  attribute :topic
  attribute :theme
  attribute :region
  attribute :era
  attribute :document_type
  attribute :sort
  attribute :page, default: 1
end
