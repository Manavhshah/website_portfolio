interface DocumentLink {
  title: string;
  url: string;
  type: 'pdf' | 'doc' | 'xlsx' | 'ppt';
  size?: string;
}

interface DocumentLinksProps {
  documents: DocumentLink[];
}

export default function DocumentLinks({ documents }: DocumentLinksProps) {
  if (!documents || documents.length === 0) return null;

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return '📄';
      case 'doc':
        return '📝';
      case 'xlsx':
        return '📊';
      case 'ppt':
        return '📈';
      default:
        return '📎';
    }
  };

  return (
    <div className="mt-8 p-6 bg-neutral-800 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 text-white">Project Documents</h3>
      <div className="space-y-3">
        {documents.map((doc, index) => (
          <a
            key={index}
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 bg-neutral-700 rounded-md hover:bg-neutral-600 transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl">{getFileIcon(doc.type)}</span>
              <div>
                <p className="text-white font-medium group-hover:text-blue-300 transition-colors">
                  {doc.title}
                </p>
                {doc.size && (
                  <p className="text-neutral-400 text-sm">{doc.size}</p>
                )}
              </div>
            </div>
            <svg
              className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}
