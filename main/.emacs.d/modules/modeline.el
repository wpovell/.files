
(setq-default mode-line-format
                '(" %b"
                  (:eval (if (and (buffer-modified-p) (not buffer-read-only)) "*" ""))
                  (:eval (if buffer-read-only " " " "))
                  'vc-mode))

(defadvice vc-mode-line (after strip-backend () activate)
  (when (stringp vc-mode)
    (let ((noback (concat
                   ""
                   (replace-regexp-in-string 
                    (format "^ %s:" (vc-backend buffer-file-name))
                    " " vc-mode))))
      (setq vc-mode noback))))
