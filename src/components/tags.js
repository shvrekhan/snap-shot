import React from "react";

class TagNames extends React.Component {
    render() {
        return (
            <>
                <div className="tag">
                    {this.props.tags.map((tagName) => {
                        return (<button key={tagName} onClick={this.props.tagHandel}>{tagName}</button>)
                    })}
                </div>
            </>
        )
    }
}

export default TagNames;