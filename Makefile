CV_SOURCE = cv/lei_yu_cv_moderncv.tex
CV_BUILD_DIR = cv/build
CV_BUILD_PDF = $(CV_BUILD_DIR)/lei_yu_cv_moderncv.pdf
CV_PUBLIC_PDF = assets/Lei-Yu-CV.pdf
LATEX ?= xelatex

.PHONY: cv clean-cv

cv: $(CV_PUBLIC_PDF)

$(CV_PUBLIC_PDF): $(CV_SOURCE)
	mkdir -p $(CV_BUILD_DIR) assets
	$(LATEX) -interaction=nonstopmode -halt-on-error -output-directory=$(CV_BUILD_DIR) $(CV_SOURCE)
	$(LATEX) -interaction=nonstopmode -halt-on-error -output-directory=$(CV_BUILD_DIR) $(CV_SOURCE)
	cp $(CV_BUILD_PDF) $(CV_PUBLIC_PDF)

clean-cv:
	rm -rf $(CV_BUILD_DIR)
