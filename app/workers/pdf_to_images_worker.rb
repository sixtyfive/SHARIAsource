class PdfToImagesWorker
  include Sidekiq::Worker

  def perform(source_id)
    source = Document.find source_id
    source.pages.destroy_all
    extract_pages source
    source.update! processed: true
  end

  private

  def extract_pages(source)
    pages = Grim.reap source.pdf.current_path
    pages.each do |page|
      path = "#{Rails.root}/tmp/pdf-#{source.id}-#{page.number}.jpg"
      page.save path, width: 1024, quality: 70, density: 150, extra: ['-flatten', '-background white']
      source_page = source.pages.build(image: File.open(path),
                                       number: page.number)
      source_page.build_body
      text = page.text || ''
      source_page.body.text = Kramdown::Document.new(text).to_html
      source_page.save!
      File.delete path
    end
  end
end
