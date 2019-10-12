import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Orders extends Component {
    render() {
        return (
            <div>
                THIS IS THE ORDERS PAGE
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
