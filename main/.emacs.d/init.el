;;; init.el --- Starting point for my emacs config

;;; Commentary:
;;

;;; Code:

;; Always start from home directory
(cd "~")

;; Have this early since emacs stuff is behind a sym-link
(setq vc-follow-symlinks t)

;; Ignore byte-compile warnings
(setq byte-compile-warnings '(not nresolved
                                  free-vars
                                  callargs
                                  redefine
                                  obsolete
                                  noruntime
                                  cl-functions
                                  interactive-only
                                  ))

(setq compiled-config (expand-file-name "emacs.elc" user-emacs-directory)
      org-config (expand-file-name "emacs.org" user-emacs-directory))

(defun last-mod (file)
  "Last modification time for FILE."
  (nth 5 (file-attributes file)))

(defun use-compiled()
  "Whether to use compiled or org version of config."
  (and (file-exists-p compiled-config)
       (time-less-p (last-mod org-config) (last-mod compiled-config))))

(let ((file-name-handler-alist nil))
  (if (use-compiled)
      (progn
        (defun display-startup-echo-area-message ()
          (message "Used compiled config"))
        (load-file compiled-config))
    (defun display-startup-echo-area-message () (message "Used org config"))
    (require 'org)
    (org-babel-load-file org-config t)))

;;; init.el ends here
