type Issue = {
    title: string
}

type IssueRevision = {
    issue: Issue;
    revisionId: string;
}

const issueRevisions: IssueRevision[] = [
    { 
        issue: {title: "Hello"},
        revisionId: "1",
    },
    { 
        issue: {title: "Hello World"},
        revisionId: "2",
    }
]

const summarizeChange = (a: Issue, b: Issue): string => {
    if (a.title !== b.title) {
        return "changed Title"
    }
    return "no change"
}