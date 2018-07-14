;; Modeline Config ;;

(defun simple-mode-line-render (left right)
  "Return a string of `window-width' length containing LEFT, and RIGHT
 aligned respectively."
  (let* ((available-width (- (window-width) (length left) 2)))
    (format (format " %%s %%%ds " available-width) left right)))

(setq-default mode-line-format
      '((:eval (simple-mode-line-render
                (format-mode-line
                 '("%b"
                   (:eval (if (and (buffer-modified-p) (not buffer-read-only)) "*" ""))
                   (:eval (if buffer-read-only " " " (%l:%C)"))))
                (format-mode-line
                 '((vc-mode (
                    " ["
                    (:eval
                     (replace-regexp-in-string
                      (format "^ %s."
                              (vc-backend buffer-file-name))
                      "" vc-mode))
                    "] "))
                   mode-name))))))
