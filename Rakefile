SRC_DIR = "./src"
SRC_NAME = "sudoku"

task :build do
  # sh "coffee -cm -o . #{SRC_DIR}/#{SRC_NAME}.coffee"
  sh "coffee -c -o . #{SRC_DIR}/#{SRC_NAME}.coffee"
end

task :deploy => [:build] do
  sh "yuicompressor --type js #{SRC_NAME}.js -o #{SRC_NAME}.min.js"
end